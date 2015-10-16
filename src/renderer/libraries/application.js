import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../components/root.js'

export default class Application {
  run() {
    var container = document.querySelector("#container")
    ReactDOM.render(<Root/>, container);
  }
}
