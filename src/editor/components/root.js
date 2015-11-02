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

import {dispatch} from '../dispatcher/app-dispatcher';

import Menu from '../components/menu';
import IssueStore from '../stores/issue-store.js';

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
        value={issue.body}
        width="100%"
        height="90vh"
      />
    </div>;
  }

  onSave() {
    dispatch({
      type: 'issue/save-local',
      value: this.props.issue
    });
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
