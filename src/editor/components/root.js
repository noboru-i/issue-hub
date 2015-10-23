import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'flux/utils';

import AceEditor from 'react-ace';
/*eslint-disable no-unused-vars*/
import brace from 'brace';
import Mode from 'brace/mode/markdown';
import ThemeGithub from 'brace/theme/github';
/*eslint-enable no-unused-vars*/

import IssueStore from '../stores/issue-store.js'

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
      <div style={{height: "10vh"}}>
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
}

const RootContainer = Container.create(Root);
export default RootContainer;
