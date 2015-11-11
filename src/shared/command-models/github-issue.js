import GitHubApi from 'github';
import remote from 'remote';

import issueDb from '../../shared/db/issue-db';

export default class GithubIssue {
  constructor(dispatch) {
    this.dispatch = dispatch;
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

    let token = remote.getGlobal('applicationData').githubAccessToken;
    this.github.authenticate({
      type: 'oauth',
      token: token
    });
  }

  fetchIssue(user, repo, forceReload = false) {
    if (forceReload) {
      this.requestIssue(user, repo);
      return;
    }
    issueDb.findAll(user, repo, (issues) => {
      if (issues.length != 0) {
        // find in db
        this.dispatch({
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
      res.forEach((i) => {
        i.user = user;
        i.repo = repo;
      });
      issueDb.save(res);
      this.dispatch({
        type: 'issues/fetch-complete',
        value: res
      });
    });
  }

  updateIssue(issue) {
    this.github.issues.edit({
      user: issue.user,
      repo: issue.repo,
      number: issue.number,
      title: issue.edited_title ? issue.edited_title : issue.title,
      body: issue.edited_body ? issue.edited_body : issue.body
    }, (err, newIssue) => {
      if (err) {
        throw err;
      }
      this.dispatch({
        type: 'issue/update-complete',
        value: newIssue
      });
    });
  }

  fetchRepo(forceReload = false) {
    if (forceReload) {
      this.requestRepo();
      return;
    }
    issueDb.findAllRepos((repos) => {
      if (repos.length != 0) {
        // find in db
        this.dispatch({
          type: 'repos/fetch-complete',
          value: repos
        });
        return;
      }

      // request to GitHub
      this.requestRepo();
    });
  }


  requestRepo() {
    this.github.repos.getAll({}, (err, repos) => {
      repos = repos.sort((a, b) => {
        return a.full_name > b.full_name ? 1 : -1;
      });
      issueDb.saveRepo(repos);
      this.dispatch({
        type: 'repos/fetch-complete',
        value: repos
      });
    });
  }
}
