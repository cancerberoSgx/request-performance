import * as React from 'react';
import ReactDOM from 'react-dom';
import { MainResult } from '../../src/main';
import { Main } from './components/main';

export const main = (resultsData: MainResult) => {
  ReactDOM.render(<Main resultsData={resultsData} />, document.getElementById('main'));
}
