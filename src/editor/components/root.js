import React from 'react';
/*eslint-disable no-unused-vars*/
import ReactDOM from 'react-dom';
/*eslint-enable no-unused-vars*/
import {Container} from 'flux/utils';
import {shell} from 'electron';

import AceEditor from 'react-ace';
/*eslint-disable no-unused-vars*/
import brace from 'brace';
import Mode from 'brace/mode/markdown';
import ThemeGithub from 'brace/theme/github';
/*eslint-enable no-unused-vars*/

import marked from 'marked';

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
    const issue = this.state.issue.toJS();
    const editorName = `editor_${this.props.issueId}`;

    return <div style={{height: '100%'}}>
      <Menu
          edited={this.state.edited}
          onSave={this.onSave.bind(this)}
          onPush={this.onPush.bind(this)}
          onOpen={this.onOpen.bind(this)} />
      <div className="title">
        {issue.title}
      </div>
      <div className="edit-main">
        <AceEditor
          mode="markdown"
          theme="github"
          name={editorName}
          editorProps={{$blockScrolling: true}}
          value={issue.edited_body ? issue.edited_body : issue.body}
          width="100%"
          height="100%"
          className="edit-main__cell"
          onChange={this.onChange.bind(this)}
        />
        <div className="edit-main__cell preview"
          dangerouslySetInnerHTML={{__html: marked(issue.edited_body || '')}} />
      </div>
    </div>;
  }

  onChange(newValue) {
    dispatch({
      type: 'issue/start-edit',
      value: newValue
    });
  }

  onSave() {
    issueDb.save(this.state.issue);
  }

  onPush() {
    const githubIssue = new GithubIssue(dispatch);
    githubIssue.updateIssue(this.state.issue);
  }

  onOpen() {
    const issue = this.state.issue.toJS();
    shell.openExternal(issue.html_url);
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
