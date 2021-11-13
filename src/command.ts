import { addUniqueParameter } from "./util";

interface CurlInfo {
  id: string
  name?: string
  description?: string
}

export const curlInfo: CurlInfo[] = [
  {
    id: 'time_connect'
  }, {
    id: 'time_starttransfer'
  }, {
    id: 'time_total'
  },
]
export interface CurlResult {
  time_connect: number
  time_starttransfer: number
  time_total: number
}

interface BuildCommandConfig {
  url: string;
  /** if given it will add a url parameter with `uniqueParameter` name and random number to avoid url caching */
  uniqueParameter?: string;
}
export const buildCommand = (config: BuildCommandConfig) => {
  const url = config.uniqueParameter ? addUniqueParameter(config.url, config.uniqueParameter) : config.url;
  const cmd = `curl -o /dev/null -H 'Cache-Control: no-cache' -s ` +
    `-w '{ ${curlInfo.map(info => `"${info.name || info.id}": %{${info.id}}`).join(', ')} }' ` +
    config.url;
  return cmd;
};
