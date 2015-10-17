import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Sidebar from './sidebar'
import MainView from './main-view'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  render() {
    return <div className="root">
  <Sidebar />
  <MainView  />
</div>;
  }
}
