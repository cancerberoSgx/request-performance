import { main } from "../main";
import { messageAndExit } from "../util";

export async function mainCli() {
  var args = require('minimist')(process.argv.slice(2));

  if (args.help) {
    messageAndExit(1, helpText)
  }
  if (!args.url || !args.url.length) {
    messageAndExit(1, 'Invalid call, at least one --url must be provided')
  }
  try {
    await main({
      ...args,
      urls: args.url,
      timeAmount: args.timeAmount || 1000,
      uniqueParam: args.uniqueParam || undefined
    })
    process.exit(0)
  } catch (error) {
    console.trace(error)
    messageAndExit(1, `${error}`)
  }
}

const helpText = `Usage: 
request-performance --url foo.com --url bar.com --timeAmount 5000 --uniqueParam test

Options: 

  --url          Required. Multiple times to compare each other
  --timeAmount   Optional. Default 1000. Test duration in ms. Make sure the amount of time makes sense for given amount of urls.
  --uniqueParam  Optional. If given it will add a url parameter with 'uniqueParam' name and random number to avoid url caching
  --report       (any of json, html). Default json
  --reportOutput file where to store the report. If not give it will print to stdout
  --reportInput  if given it won't run the test just build a --report from provided json file
`
