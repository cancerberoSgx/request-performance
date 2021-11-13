import { main } from "..";
import { messageAndExit } from "../util";

export async function mainCli() {
  var args = require('minimist')(process.argv.slice(2));

  if(args.help) {
    messageAndExit(1, helpText)
  }
  if(!args.url || !args.url.length) {
    messageAndExit(1, 'Invalid call, at least one --url must be provided')
  }

  const result = await main({
    urls: args.url,
    timeAmount: args.timeAmount || 1000,
    uniqueParam: args.uniqueParam || undefined
  })
  console.log(JSON.stringify(result, null, 2));
//   const result = await main({
//     urls: [
//       'https://api.stg.findluca.com/version',
//       'https://api.prod.cloud.findmotto.com/version'
//     ],
//     timeAmount: 4000,
//     uniqueParam: 'test1'
//   });
//   console.log(JSON.stringify(result, null, 2));

  process.exit(0)
}
const helpText = `Usage: 
request-performance --url foo.com --url bar.com --timeAmount 5000 --uniqueParam test

Options: 

 --url          Required. Multiple times to compare each other
 --timeAmount   Optional. Default 1000. Test duration in ms. Make sure the amount of time makes sense for given amount of urls.
 --uniqueParam
`