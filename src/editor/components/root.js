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

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [IssueStore];
  }

  static calculateState() {
    return {
      issue: IssueStore.getState().get('issues')
    };
  }

  render() {
    const issue = this.props.issue;
    const editorName = `editor_${issue.id}`;

    return <div>
      <Menu onSave={this.onSave.bind(this)} />
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
    this.props.issue.edited_body = newValue;
  }

  onSave() {
    issueDb.save(this.props.issue);
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
