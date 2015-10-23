import GitHubApi from 'github';

import {dispatch} from '../dispatcher/app-dispatcher';

export default class GithubIssue {
  constructor() {
    this.github = new GitHubApi({
      // required
      version: '3.0.0',
      // optional
      protocol: 'https',
      timeout: 5000,
      headers: {
        'user-agent': 'IssueHub'
      }
    });
  }

  fetchIssue(user, repo) {
    this.github.issues.repoIssues({
      user: user,
      repo: repo
    }, (err, res) => {
      dispatch({
        type: 'issues/fetch-complete',
        value: res
      });
    });
  }
}
