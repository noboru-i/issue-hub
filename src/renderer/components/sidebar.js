import React from 'react'
import SidebarItem from './sidebar-item'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issues = this.props.issues;
    return <div className="pane-sm sidebar">
      <ul className="list-group">
        <li className="list-group-header">
          <input className="form-control" type="text" placeholder="Search for someone" />
        </li>
        {issues.map((issue) => {
          return <SidebarItem key={issue.id} issue={issue} />;
        })}
      </ul>
    </div>;
  }
}
