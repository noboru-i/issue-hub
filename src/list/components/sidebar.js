import React from 'react';
import SidebarItem from './sidebar-item';
import GithubIssue from '../command-models/github-issue';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issues = this.props.issues;
    const repos = this.props.repos;
    console.log(repos);
    return <div className="pane-sm sidebar">
      <ul className="list-group">
        <li className="list-group-header">
          <select className="form-control" onChange={this.onSelectRepo}>
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
    const githubIssue = new GithubIssue();
    const [user, repo] = fullName.split('/');
    githubIssue.fetchIssue(user, repo);
  }
}
