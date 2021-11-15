import { main } from '.'
import { MainResult } from '../../src'

declare const resultsData: MainResult

main(resultsData)

// const getValueChartConfig = (data: MainResult) => {
//   const labels = array(Object.values(data.results)[0].length).map(i=>`${i}`)
//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       labels: labels,
//       datasets: [{
//         label: 'My First dataset',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: [20, 10, 5, 2, 20, 30, 45],
//       }]
//     }
//   }
//   return config
// }

// const Main = () => {
//   const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//   ];
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [20, 10, 5, 2, 20, 30, 45],
//     }]
//   };
//   const config = {
//     type: 'line',
//     data: data,
//     options: {}
//   };
//   const ref = React.useRef(null);

//   React.useEffect(() => {
//     console.log(document.getElementById('myChart'));
//     const chart = new Chart(ref.current as HTMLCanvasElement, config as any)
//   })
//   return <div>
//     <h1>hello world</h1>
//     <h3>urls</h3>
//     <label>stats<select>
//       {curlInfo.map(info=><option value={info.id}>{info.name||info.id}</option>)}
//       </select></label>
//     <ul>{Object.keys(resultsData?.stats).map(url => <li>{url}</li>)}</ul>
//     <canvas style={{ width: 200, height: 200 }} id="myChart" ref={ref} />
//   </div>
// }

// ReactDOM.render(<Main />, document.getElementById('main'));
