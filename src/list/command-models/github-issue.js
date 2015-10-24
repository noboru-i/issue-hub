import GitHubApi from 'github';

import {dispatch} from '../dispatcher/app-dispatcher';
import issueDb from '../../shared/db/issue-db';

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

  fetchIssue(user, repo, forceReload = false) {
    if (forceReload) {
      this.requestIssue(user, repo);
      return;
    }
    issueDb.findAll((issues) => {
      console.log(issues);
      console.log('length = ' + issues.length);
      if (issues.length != 0) {
        // find in db
        dispatch({
          type: 'issues/fetch-complete',
          value: issues
        });
        return;
      }

      // request to GitHub
      this.requestIssue(user, repo);
    });
  }

  requestIssue(user, repo) {
    this.github.issues.repoIssues({
      user: user,
      repo: repo
    }, (err, res) => {
      issueDb.save(res);
      dispatch({
        type: 'issues/fetch-complete',
        value: res
      });
    });

  }
}
