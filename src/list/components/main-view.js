import React from 'react';
import marked from 'marked';
import remote from 'remote';
import shell from 'shell';

const openEditor = remote.require('../browser/index.js').openEditor;

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issue = this.props.selectedIssue;
    return <div className="pane">
      <div className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default"
                onClick={this.itemOpen.bind(this)}>
              <span className="icon icon-pencil"></span>
            </button>
            <button className="btn btn-default"
                onClick={this.itemBrowse.bind(this)}>
              <span className="icon icon-export"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="issue-title">
        {issue.title}
      </div>
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(issue.body || '')}} />
    </div>;
  }

  itemOpen() {
    openEditor(this.props.selectedIssue.id);
  }

  itemBrowse() {
    shell.openExternal(this.props.selectedIssue.html_url);
  }
}
