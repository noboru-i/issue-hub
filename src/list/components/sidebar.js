/* global localStorage */
import React from 'react';
import SidebarItem from './sidebar-item';
import GithubIssue from '../../shared/command-models/github-issue';
import {dispatch} from '../dispatcher/app-dispatcher';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.full_name) {
      this.onSelectRepo({
        target: {
          value : localStorage.full_name
        }
      });
    }
  }

  render() {
    const issues = this.props.issues;
    const repos = this.props.repos;
    console.log(repos);
    return <div className="pane-sm sidebar">
      <ul className="list-group">
        <li className="list-group-header">
          <select className="form-control" value={localStorage.full_name} onChange={this.onSelectRepo}>
            <option></option>
            {repos.map((repo) => {
              return <option key={repo.full_name}>{repo.full_name}</option>;
            })}
          </select>
        </li>
        {issues.map((issue) => {
          return <SidebarItem key={issue.id} issue={issue} />;
        })}
      </ul>
    </div>;
  }

  onSelectRepo(e) {
    console.log('onSelectRepo');
    const fullName = e.target.value;
    const githubIssue = new GithubIssue(dispatch);
    const [user, repo] = fullName.split('/');
    localStorage.full_name = fullName;
    githubIssue.fetchIssue(user, repo);
  }
}
