import React from 'react'
import Mui from 'material-ui'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issues = this.props.issues;
    return <div className="sidebar" >
      <Mui.List>
        {issues.map((issue) => {
          return <Mui.ListItem key={issue.id} primaryText={issue.title} />;
        })}
      </Mui.List>
    </div>;
  }
}
