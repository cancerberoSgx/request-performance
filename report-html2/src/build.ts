// Node.js script that generates a index.html file with given data embedded and creates build the react app with parcel

import { execSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
const dataGlobal = 'resultsData'

interface Config {
  data: string
  reportOutput?: string
}
export async function html2Build(config: Config) {
  const cwd = resolve(`${__dirname}/..`)
  execSync(`rm -rf dist`, { cwd })
  // TODO: we are always compiling src for debug
  execSync(`npx parcel build src/html2.tsx`, { cwd })

  const htmlTemplate = readFileSync(`${__dirname}/html2.html`).toString()
  const html = htmlTemplate.split('\n').map(l => {
    if (l.includes('$%$&replace_me_with_json$%$&')) {
      return `<script>
      window.${dataGlobal} = ${JSON.stringify(config.data)}
      </script>`
    }
    else if (l.includes('$%$&replace_me_with_js$%$&')) {
      return `<script>
        ${readFileSync(`${__dirname}/../dist/html2.js`).toString()}
      </script>`
    }    
    else {
      return l
    }
  }).join('\n')

  if(config.reportOutput) {
    writeFileSync(config.reportOutput, html)
  }
  else {
    console.log(html)
  }

  return {
    html 
  }
  
}


; (async () => {
  var args = require('minimist')(process.argv.slice(2));

  const result = await html2Build({
    data: JSON.parse(readFileSync(args.reportInput).toString()),
    reportOutput: args.reportOutput
    // data: JSON.parse(readFileSync('../src/probes/json1.json').toString()),
    // reportOutput: 'tmp_seba.html'
  })
})();