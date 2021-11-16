import * as React from 'react';
import { P } from '../constants';
import { Stats } from './statsComponent';
import { Values } from './valuesComponent';

export const Main = (props: P) => {
  return <div>
    <h3>urls</h3>
    <ul>{Object.keys(props.resultsData?.stats).map(url => <li key={url}>{url}</li>)}</ul>
    <Stats {...props} />
    <Values {...props} />
  </div>;
};
