import React from 'react';
import {Container} from 'flux/utils';

import brace from 'brace';
import AceEditor from 'react-ace';

import Mode from 'brace/mode/markdown';
import ThemeGithub from 'brace/theme/github';


class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [];
  }

  static calculateState() {
    return {};
  }

  render() {
    console.log(brace);
    console.log(Mode);
    console.log(ThemeGithub);
    return <AceEditor
    mode="markdown"
    theme="github"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
  />;
  }
}

const RootContainer = Container.create(Root);
export default RootContainer;
