import { JSXAlone, ElementClass } from 'jsx-alone-string'

// example function element
const TaskPageLink = props => 
  <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

interface P {
  tasks: string[]
  name: string
}
// example class element that uses previous TaskPageLink element
class App extends ElementClass<P> {
  render() {
    return (
      <article>
        <h3>Welcome {this.props.name}!</h3>
        <p>These are your tasks:</p>
        <ul>
          {this.props.tasks.map(task => (
            <li>
              <TaskPageLink task={task}>{task}</TaskPageLink>
            </li>
          ))}
        </ul>
      </article>
    )
  }
}

// render the App and append the generated element to body
const tasks = ['Wash dishes', 'Go outside', 'Play soccer']
const app = <App name="John Doe" tasks={tasks} />
const output = JSXAlone.render(app)
console.log(output);
