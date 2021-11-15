import { MainResult, TimingStatsNames } from "../../..";
import { JSXAlone } from 'jsx-alone-string'
import { curlInfo } from "../../../command";

export type P = { data: MainResult }

export const Main = (props: P) => {
  const urls = Object.keys(props.data.stats)
  Object.keys(props.data.stats[0] || {})
  // console.log(props.data.stats);

  return <article>
    <h1>Comparing {urls.join(', ')}</h1>
    {urls.map(url => <div>
      <h2>{url}</h2>
      <InfoTable {...props} url={url}></InfoTable>
      <ValuesTable {...props} url={url}></ValuesTable>
      <br/><br/><br/>
    </div>)}
  </article>
}

const ValuesTable = (props: P & { url: string }) => {
  return <section>
    <h4>Requests</h4>
    <table>
      <thead>
        <tr>
          {curlInfo.map(info => <th>{info.name || info.id}</th>)}
        </tr>
      </thead>
      <tbody>
        {Object.values(props.data.results[props.url]).map(value => <tr>
          {curlInfo.map(info => <td>{value[info.id]}</td>)}
        </tr>
        )}
      </tbody>
    </table>
    <div data-url={props.url} className="valueChart"/>
  </section>
}

const InfoTable = (props: P & { url: string }) => {
  return <section>
    <h4>Stats</h4>
    <table>
      <thead>
        <tr>
          {[{id: ''}, {id: 'error_ratio'}, ...curlInfo].map(info => <th>{info!.name || info.id}</th>)}
        </tr>
      </thead>
      <tbody>
        {TimingStatsNames.map(statName =>
          <tr>
            <td><strong>{statName}</strong></td>
            <td><strong>{props.data.stats[props.url].errorRatio + ''}</strong></td>
            {curlInfo.map(info =>
              <td>{props.data.stats[props.url][statName][info.id]}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </section>
}
