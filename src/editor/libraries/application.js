/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Root from '../components/root';
import Url from 'url';
import Remote from 'remote';

const getIssueFromId = Remote.require('../browser/index.js').getIssueFromId;

export default class Application {
  constructor() {
  }

  run() {
    let issueId = Url.parse(location.href, true).query.issue_id;
    let issue = getIssueFromId(issueId);
    var container = document.querySelector('#container');
    ReactDOM.render(<Root issue={issue} />, container);
  }
}
