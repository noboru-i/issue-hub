import url from 'url';
import GitHubApi from 'github';
import {OAuth2} from 'oauth';

import githubOptions from '../../shared/config/github';

class GithubAuthUtil {
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
    this.oauth = new OAuth2(
      githubOptions.client_id,
      githubOptions.client_secret,
      'https://github.com/',
      'login/oauth/authorize',
      'login/oauth/access_token');
  }

  getAuthUrl() {
    return this.oauth.getAuthorizeUrl({
      scope: githubOptions.scopes
    });
  }

  checkUrl(paramUrl, callback) {
    const urlObject = url.parse(paramUrl, true);
    const code = urlObject.query.code;
    console.log('code = ' + code);
    if (!code) {
      return;
    }

    this.oauth.getOAuthAccessToken(
      code,
      {},
      (err, accessToken) => {
        if (err) {
          console.log(err);
          return;
        }

        this.github.authenticate({
          type: 'oauth',
          token: accessToken
        });
        callback(err, accessToken);
      }
    );
  }
}

const instance = new GithubAuthUtil();
export default instance;
