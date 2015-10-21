import React from 'react';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="pane">
      <div>
        {this.props.selectedIssue.title}
      </div>
    </div>;
  }
}
