import Chart, { ChartConfiguration } from 'chart.js/auto';
import * as React from 'react';
import { curlInfo } from '../../../src/command';
import { MainResult } from '../../../src/main';
import { colors, P } from '../constants';

export const Stats = (props: P) => {
  let stats = curlInfo[0].id
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
    <h3>General Stats</h3>
    <canvas
      dangerouslySetInnerHTML={{ __html: 'canvas1' }}
      style={{ width: '80vw', height: '30vh', position: 'relative' }}
      id="myChart" ref={ref}
    />
  </>
}

const getValueChartConfig = (data: MainResult, stats: string): ChartConfiguration => {
  const labels = curlInfo.map(info => info.id)
  const config: ChartConfiguration = {
    type: 'bar' as any,
    data: {
      labels,
      datasets: Object.keys(data.results).map((url, i) => ({
        label: url,
        backgroundColor: colors[i],
        borderColor: colors[i],
        data: labels.map(id => data.stats[url]['average'][id]),
      }))
    },
    options: {}
  }
  return config
}
