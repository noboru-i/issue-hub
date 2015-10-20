import React from 'react'
import {Container} from 'flux/utils'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Sidebar from './sidebar'
import MainView from './main-view'
import IssuesStore from '../stores/issues-store'


class Root extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  static getStores() {
    return [IssuesStore];
  }

  static calculateState(prevState) {
    return {
      issues: IssuesStore.getState(),
    };
  }

  render() {
    return <div className="root">
      <Sidebar issues={this.state.issues} />
      <MainView  />
    </div>;
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
