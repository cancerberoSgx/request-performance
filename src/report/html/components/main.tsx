import { MainResult } from "../../..";
import { JSXAlone } from 'jsx-alone-string'

export type P = {data: MainResult}

export const Main = (props:P)=> {
  return <article>
            <h1>Comparing {Object.keys(props.data.stats).join(', ')}</h1>
            {/* <p>These are your tasks:</p>
            <ul>
              {this.props.tasks.map(task => (
                <li>
                  <TaskPageLink task={task}>{task}</TaskPageLink>
                </li>
              ))}
            </ul>  */}
          </article>
      }