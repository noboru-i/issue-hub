import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <header className="toolbar toolbar-header">
      <div className="toolbar-actions">
        <button className="btn btn-default"
            onClick={this.props.onSave}>
          <span className="icon icon-floppy icon-text"></span>
          Save
        </button>

        <button className="btn btn-default"
            onClick={this.props.onPush}>
          <span className="icon icon-upload icon-text"></span>
          Push
        </button>

        <button className="btn btn-default">
          <span className="icon icon-download icon-text"></span>
          Pull
        </button>

        <button className="btn btn-default pull-right">
          <span className="icon icon-retweet icon-text"></span>
          {this.props.edited ? '変更済み' : '未変更'}
        </button>

        <button className="btn btn-default pull-right"
            onClick={this.props.onOpen}>
          <span className="icon icon-export"></span>
        </button>
      </div>
    </header>;
  }
}
