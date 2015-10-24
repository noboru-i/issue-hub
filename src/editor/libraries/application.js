/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Url from 'url';

import Root from '../components/root';
import issueDb from '../../shared/db/issue-db';

export default class Application {
  constructor() {
  }

  run() {
    let issueId = Url.parse(location.href, true).query.issue_id;

    issueDb.initialize(() => {
      issueDb.find(issueId, (issue) => {
        var container = document.querySelector('#container');
        ReactDOM.render(<Root issue={issue} />, container);
      });
    });
  }
}
