import { asyncMap, parseJSON } from "misc-utils-of-mine-generic";
import { buildCommand, curlInfo, CurlResult } from "./command";
import { addUniqueParam, average, exec, median } from "./util";

export interface MainConfig {
  /** urls will be tested in order, serially. If more than one is provided */
  urls: string[]
  /** concurrent requests. Internally uses a queue so we always have `concurrency` requests in progress. Default: 1 */
  concurrency?: number
  /** number of milliseconds you want to spend in the test. It will break and report after that. */
  timeAmount?: number
  /** if given it will add a url parameter with `uniqueParam` name and random number to avoid url caching */
  uniqueParam?: string
}
interface CallResult {
  error?: string
  result?: CurlResult
}

type Stats = { [stat: string]: CurlResult } & { errorRatio: number }

export interface MainResult {
  results: {
    [url: string]: CallResult[]
  }
  realUrl: string
  stats: {
    [url: string]: Stats
  }
}

export async function main(config: MainConfig) {
  config.urls = config.urls || [];
  config.concurrency = config.concurrency || 1;
  config.timeAmount = config.timeAmount || 1000;
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
        return { url, error: error + '', cmd, realUrl  };
      }
    });
    urlResults.forEach(r => {
      results[r.url] = results[r.url] || [];
      results[r.url].push({...(r.error ? {error: r.error} : r.result), cmd: r.cmd, realUrl: r.realUrl});
    });
  }
  const stats: { [url: string]: Stats; } = {};
  Object.keys(results).forEach(url => {
    stats[url] = stats[url] || {} as Stats;
    const noErrors = results[url].filter(r => !r.error);
    stats[url].errorRatio = (results[url].length - noErrors.length) / results[url].length;
    curlInfo.forEach(info => {
      const values = noErrors.map(e => e[info.id]);

      stats
      stats[url]['average'] = stats[url]['average'] || {} as CurlResult;
      stats[url]['average'][info.id] = average(values);

      stats[url]['median'] = stats[url]['median'] || {} as CurlResult;
      stats[url]['median'][info.id] = median(values);

    });
  });
  return { results, stats };
}