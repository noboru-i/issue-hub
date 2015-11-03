/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Url from 'url';

import Root from '../components/root';

export default class Application {
  constructor() {
  }

  run() {
    let issueId = Url.parse(location.href, true).query.issue_id;

    var container = document.querySelector('#container');
    ReactDOM.render(<Root issueId={issueId} />, container);
  }
}
