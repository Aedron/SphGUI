
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";



@withStore
@observer
class Editor extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className={`trans ${store.view === 'editor' ? 'active' : ''}`}>
        <h1>Editor</h1>
      </div>
    );
  }
}


export default Editor;
