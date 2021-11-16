import * as React from 'react';
import { MainResult } from '../../../src/main';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { array } from 'misc-utils-of-mine-generic';
import { curlInfo } from '../../../src/command';
import { colors, P } from '../constants';
import { styles } from './styles';

export const Values = (props: P) => {
  let stats = curlInfo[0].id
  const statsChange = stats => {
    config = getValueChartConfig(props.resultsData, stats)
    chart.data = config.data
    chart.update()
  }
  let config = getValueChartConfig(props.resultsData, stats);
  const ref = React.useRef(null);
  let chart: Chart
  React.useEffect(() => {
    if (!chart) {
      chart = new Chart(ref.current as HTMLCanvasElement, config as any);
    }
    return () => {
      chart?.destroy()
    }
  })
  return <>
    <h3>Time Values</h3>
    <select style={styles.select} onChange={e => {
      const value = (e.target as HTMLSelectElement).value
      statsChange(value)
    }}>
      {curlInfo.map(info =>
        <option value={info.id} selected={info.name === stats} key={info.id}>{info.name || info.id}</option>
      )}
    </select>
    <canvas
      dangerouslySetInnerHTML={{ __html: 'canvas1' }}
      style={{ width: '80vw', height: '30vh', position: 'relative' }}
      id="myChart" ref={ref}
    />
  </>
}

const getValueChartConfig = (data: MainResult, stats: string): ChartConfiguration => {
  const labels = array(Object.values(data.results)[0].length).map(i => `${i}`)
  const config: ChartConfiguration = {
    type: 'line' as any,
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
  }
  return config
}
