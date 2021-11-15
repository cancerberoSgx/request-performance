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
  }, {
    id: 'time_appconnect'
  }, {
    id: 'time_namelookup'
  }, {
    id: 'time_pretransfer'
  }, {
    id: 'time_redirect'
  },
  {
    id: 'num_connects'
  }, {
    id: 'num_redirects'
  }, {
    id: 'speed_download'
  }, {
    id: 'speed_upload'
  },
]
export interface CurlResult {
  time_connect: number
  time_starttransfer: number
  time_total: number
  time_appconnect: number
  time_namelookup: number
  time_pretransfer: number
  time_redirect: number
}

interface BuildCommandConfig {
  url: string;
  /** if given it will add a url parameter with `uniqueParam` name and random number to avoid url caching */
  uniqueParam?: string;
}
export const buildCommand = (config: BuildCommandConfig) => {
  const cmd = `curl -o /dev/null -H 'Cache-Control: no-cache' -s ` +
    `-w '{ ${curlInfo.map(info => `"${info.name || info.id}": %{${info.id}}`).join(', ')} }' ` +
    config.url;
  return cmd;
};
