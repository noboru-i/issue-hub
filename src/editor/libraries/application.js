/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Root from '../components/root';

export default class Application {
  constructor() {
  }

  run() {
    var container = document.querySelector('#container');
    ReactDOM.render(<Root/>, container);
  }
}
