import React from 'react';
/*eslint-disable no-unused-vars*/
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import {Container} from 'flux/utils';

import AceEditor from 'react-ace';
/*eslint-disable no-unused-vars*/
import brace from 'brace';
import Mode from 'brace/mode/markdown';
import ThemeGithub from 'brace/theme/github';
/*eslint-enable no-unused-vars*/

import Menu from '../components/menu';
import IssueStore from '../stores/issue-store.js';
import issueDb from '../../shared/db/issue-db';
import GithubIssue from '../../shared/command-models/github-issue';
import {dispatch} from '../dispatcher/app-dispatcher';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [IssueStore];
  }

  static calculateState() {
    return {
      issue: IssueStore.getState().get('issue'),
      edited: IssueStore.getState().get('edited')
    };
  }

  componentDidMount() {
    issueDb.initialize(() => {
      issueDb.find(this.props.issueId, (issue) => {
        dispatch({
          type: 'issue/init',
          value: issue
        });
      });
    });
  }

  render() {
    const issue = this.state.issue;
    const editorName = `editor_${this.props.issueId}`;

    return <div>
      <Menu
          edited={this.state.edited}
          onSave={this.onSave.bind(this)}
          onPush={this.onPush.bind(this)}/>
      <div style={{height: '10vh', fontSize: '2rem'}}>
        {issue.title}
      </div>
      <AceEditor
        mode="markdown"
        theme="github"
        name={editorName}
        editorProps={{$blockScrolling: true}}
        value={issue.edited_body ? issue.edited_body : issue.body}
        width="100%"
        height="90vh"
        onChange={this.onChange.bind(this)}
      />
    </div>;
  }

  onChange(newValue) {
    this.state.issue.edited_body = newValue;
    dispatch({
      type: 'issue/start-edit'
    });
  }

  onSave() {
    issueDb.save(this.state.issue);
  }

  onPush() {
    const githubIssue = new GithubIssue(dispatch);
    githubIssue.updateIssue(this.state.issue);
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
