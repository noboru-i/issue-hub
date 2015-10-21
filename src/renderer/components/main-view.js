import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

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
