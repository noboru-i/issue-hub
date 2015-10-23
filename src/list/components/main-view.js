import React from 'react';
import marked from 'marked';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issue = this.props.selectedIssue;
    return <div className="pane">
      <div className="issue-title">
        {issue.title}
      </div>
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(issue.body || '')}} />
    </div>;
  }
}
