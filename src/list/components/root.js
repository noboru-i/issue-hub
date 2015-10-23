import React from 'react';
import {Container} from 'flux/utils';
import Sidebar from './sidebar';
import MainView from './main-view';
import IssuesStore from '../stores/issues-store';


class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [IssuesStore];
  }

  static calculateState() {
    return {
      issues: IssuesStore.getState().get('issues'),
      selectedIssue: IssuesStore.getState().get('selectedIssue')
    };
  }

  render() {
    return <div className="window">
      <div className="window-content">
        <div className="pane-group">
          <Sidebar issues={this.state.issues} />
          <MainView selectedIssue={this.state.selectedIssue} />
        </div>
      </div>
    </div>;
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
