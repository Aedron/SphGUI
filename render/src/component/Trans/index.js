
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";



@withStore
@observer
class Trans extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className={`trans ${store.view === 'trans' ? 'active' : ''}`}>
        <h1>Trans</h1>
      </div>
    );
  }
}


export default Trans;
