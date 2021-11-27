import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { addUniqueParam, asyncMap, average, median, parseJSON } from "misc-utils-of-mine-generic";
import { resolve } from "path";
import { buildCommand, curlInfo, CurlResult } from "./command";
import { buildHtml } from "./report/html";
import { exec } from "./util";

export interface MainConfig {
  /** urls will be tested in order, serially. If more than one is provided */
  urls: string[]
  /** concurrent requests. Internally uses a queue so we always have `concurrency` requests in progress. Default: 1 */
  concurrency?: number
  /** number of milliseconds you want to spend in the test. It will break and report after that. */
  timeAmount?: number
  /** if given it will add a url parameter with `uniqueParam` name and random number to avoid url caching */
  uniqueParam?: string
  /** Default json */
  report?: 'json' | 'html' | 'html2'
  /** file where to store the report. If not give it will print to stdout */
  reportOutput?: string
  /** if given it won't run the test just build a --report from provided json file */
  reportInput?: string
}
interface CallResult {
  error?: string
  result?: CurlResult
}

export type Stats = { [stat: string]: CurlResult } & { errorRatio: number }
export const TimingStatsNames = ['average', 'median']

export interface MainResult {
  results: {
    [url: string]: CallResult[]
  }
  stats: {
    [url: string]: Stats
  }
}

export async function main(config: MainConfig) {
  config.urls = config.urls || [];
  config.concurrency = config.concurrency || 1;
  config.timeAmount = config.timeAmount || 1000;
  // console.log('main config', JSON.stringify(config, null, 2));
  let result: MainResult
  if (config.reportInput) {
    result = JSON.parse(readFileSync(config.reportInput).toString())
  } else {
    result = await runTest(config);
  }
  await handleReports(config, result)
  return result;
}

async function runTest(config: MainConfig) {
  setTimeout(() => {
    finished = true;
  }, config.timeAmount || 500);
  const results: { [url: string]: CallResult[]; } = {};
  let finished = false;
  while (!finished) {
    const urlResults = await asyncMap(config.urls || [], async (url) => {
      const realUrl = config.uniqueParam ? addUniqueParam(url, config.uniqueParam) : url;
      const cmd = buildCommand({ url: realUrl });
      try {
        const { stdout, stderr } = await exec(cmd);
        const result = parseJSON(stdout, null) as CurlResult;
        if (!result) {
          return { error: `invalid JSON stdout: ${stdout}.\nstderr: ${stderr}` };
        }
        return { url, result, cmd, realUrl };
      } catch (error) {
        console.log('ERROR', error);
        return { url, error: error + '', cmd, realUrl };
      }
    });
    urlResults.forEach(r => {
      results[r.url] = results[r.url] || [];
      results[r.url].push({ ...(r.error ? { error: r.error } : r.result), cmd: r.cmd, realUrl: r.realUrl });
    });
  }
  const stats: { [url: string]: Stats; } = {};
  Object.keys(results).forEach(url => {
    stats[url] = stats[url] || {} as Stats;
    const noErrors = results[url].filter(r => !r.error);
    stats[url].errorRatio = (results[url].length - noErrors.length) / results[url].length;
    curlInfo.forEach(info => {
      const values = noErrors.map(e => e[info.id]);
      stats[url]['average'] = stats[url]['average'] || {} as CurlResult;
      stats[url]['average'][info.id] = average(values);

      stats[url]['median'] = stats[url]['median'] || {} as CurlResult;
      stats[url]['median'][info.id] = median(values);

    });
  });
  return { stats, results };
}

async function handleReports(config: MainConfig, result: MainResult) {
  config.report = config.report || 'json'
  let output: string
  if (config.report === 'json') {
    output = JSON.stringify(result, null, 2)
  }
  if (config.report === 'html') {
    output = buildHtml(result)
  }
  if (config.report === 'html2') {
    execSync('npx ts-node src/build.ts', {cwd: resolve(`${__dirname}/../report-html2`)})
  }

  if (config.reportOutput) {
    writeFileSync(config.reportOutput, output)
  } else {
    console.log(output)
  }
}
