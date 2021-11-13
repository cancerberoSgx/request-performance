import { readFileSync, writeFileSync } from "fs";
import { MainResult } from "..";
import { JSXAlone, ElementClass } from 'jsx-alone-string'

export function buildHtml(data: MainResult) {
  const htmlTemplate = readFileSync('src/report/html/report.html').toString()
  const jsTemplate = readFileSync('src/report/html/report.js').toString()
  const cssTemplate = readFileSync('src/report/html/report.css').toString()

  // example function element
  const TaskPageLink = props =>
    <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

  // example class element that uses previous TaskPageLink element
  class App extends ElementClass<{data: MainResult}> {
    render() {
      return (
        <article>
          <h1>Comparing {Object.keys(data.stats).join(', ')}</h1>
          {/* <p>These are your tasks:</p>
          <ul>
            {this.props.tasks.map(task => (
              <li>
                <TaskPageLink task={task}>{task}</TaskPageLink>
              </li>
            ))}
          </ul>  */}
        </article>
      )
    }
  }

  // render the App and append the generated element to body
  const tasks = ['Wash dishes', 'Go outside', 'Play soccer']
  const app = <App data={data} />
  const html = JSXAlone.render(app)

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

function main() {
  const data = JSON.parse(readFileSync('src/probes/json1.json').toString())
  const s = buildHtml(data)
  writeFileSync('tmp_report1.html', s)
}
main()