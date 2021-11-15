import * as React from 'react';
import ReactDOM from 'react-dom';
import { MainResult } from '../../src/main';
import Chart from 'chart.js/auto';
import { array } from 'misc-utils-of-mine-generic';
import { curlInfo } from '../../src/command';

const colors = ['rgb(255, 99, 132)', 'rgb(99, 255, 112)'];

const getValueChartConfig = (data: MainResult, stats: string) => {
  const labels = array(Object.values(data.results)[0].length).map(i => `${i}`);
  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: Object.keys(data.results).map((url, i) => ({
        label: url,
        backgroundColor: colors[i],
        borderColor: colors[i],
        data: data.results[url].map(r => r[stats]),
      }))
    },
    options: {}
  };
  return config;
};
const Main = (props: {resultsData: MainResult}) => {
  const config = getValueChartConfig(props.resultsData, 'time_connect');
  console.log(JSON.stringify(config, null, 2));

  const ref = React.useRef(null);

  React.useEffect(() => {
    console.log(document.getElementById('myChart'));
    const chart = new Chart(ref.current as HTMLCanvasElement, config as any);
    
  });
  return <div>
    <h1>hello world</h1>
    <h3>urls</h3>
    <label>stats<select>
          {curlInfo.map(info=><option value={info.id}>{info.name||info.id}</option>)}
          </select></label>
    <ul>{Object.keys(props.resultsData?.stats).map(url => <li>{url}</li>)}</ul>
    <canvas style={{ width: 200, height: 200 }} id="myChart" ref={ref} />
  </div>;
};

export const main = (resultsData: MainResult)=>{
  ReactDOM.render(<Main resultsData={resultsData}/>, document.getElementById('main'));
}
