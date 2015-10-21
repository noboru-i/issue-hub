import React from 'react';
import {dispatch} from '../dispatcher/app-dispatcher';

export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  render() {
    const issue = this.props.issue;
    return <li className={this.getClassName.apply(this)}
        key={issue.id}
        onClick={this.itemClick.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
      <div className="media-body">
        <strong>{issue.title}</strong>
        <p>{issue.body}</p>
      </div>
    </li>;
  }

  onMouseOver() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  getClassName() {
    return `list-group-item ${this.state.hover ? ' active' : ''}`;
  }

  itemClick() {
    console.log('itemClick');
    console.log(this.props.issue);
    dispatch({
      type: 'issue/select',
      value: this.props.issue
    });
  }
}
