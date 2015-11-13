/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import Root from '../components/root';
import GithubIssue from '../../shared/command-models/github-issue';
import issueDb from '../../shared/db/issue-db';
import {dispatch} from '../dispatcher/app-dispatcher';

export default class Application {
  constructor() {
    this.githubIssue = new GithubIssue(dispatch);
  }

  run() {
    issueDb.initialize(() => {
      var container = document.querySelector('#container');
      ReactDOM.render(<Root/>, container);

      this.githubIssue.fetchRepo();
    });
  }
}
