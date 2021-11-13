import { readFileSync, writeFileSync } from "fs";
import { MainResult } from "..";
import { JSXAlone, ElementClass } from 'jsx-alone-string'
import { Main } from "./html/components/main";

export function buildHtml(data: MainResult) {
  const htmlTemplate = readFileSync('src/report/html/report.html').toString()
  const jsTemplate = readFileSync('src/report/html/report.js').toString()
  const cssTemplate = readFileSync('src/report/html/report.css').toString()

  const result = htmlTemplate.split('\n').map(l=>{
    if(l.includes('$%$&replace_me_with_styles$%$& ')) {
      return `<style>${cssTemplate}</style>`
    } 
    else if(l.includes('$%$&replace_me_with_json$%$&')) {
      return `<script>
      window.data = ${JSON.stringify(data)}
      </script>`
    }
    else if(l.includes('$%$&replace_me_with_html$%$&')) {
      const html = JSXAlone.render(<Main data={data}/>)
      return html
    }
    else if(l.includes('$%$&replace_me_with_js$%$&')) {
      return `<script>${jsTemplate}</script>`
    }
    else {
      return l
    }
  }).join('\n')

  return result
}

// function main() {
//   const data = JSON.parse(readFileSync('src/probes/json1.json').toString())
//   const s = buildHtml(data)
//   writeFileSync('tmp_report1.html', s)
// }
// main()