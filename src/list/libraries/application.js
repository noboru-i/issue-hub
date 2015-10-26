/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Root from '../components/root';
import GithubIssue from '../command-models/github-issue';
import issueDb from '../../shared/db/issue-db';

export default class Application {
  constructor() {
    this.githubIssue = new GithubIssue();
  }

  run() {
    var container = document.querySelector('#container');
    ReactDOM.render(<Root/>, container);

    issueDb.initialize(() => {
      this.githubIssue.fetchRepo();
    });
  }
}
