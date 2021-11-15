import * as React from 'react'
import ReactDOM from 'react-dom'
import { MainResult } from '../../src'
import Chart from 'chart.js/auto'

declare const resultsData: MainResult

const Main = () => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [20, 10, 5, 2, 20, 30, 45],
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  const ref = React.useRef(null);

  React.useEffect(() => {
    console.log(document.getElementById('myChart'));
    const chart = new Chart(ref.current as HTMLCanvasElement, config as any)
  })
  return <div>
    <h1>hello world</h1>
    <h3>urls</h3>
    <ul>{Object.keys(resultsData?.stats).map(url => <li>{url}</li>)}</ul>
    <canvas style={{ width: 200, height: 200 }} id="myChart" ref={ref} />
  </div>
}

ReactDOM.render(<Main />, document.getElementById('main'));
