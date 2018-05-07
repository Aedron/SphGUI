
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";



@withStore
@observer
class Conf extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className={`conf ${store.view === 'conf' ? 'active' : ''}`}>
        <h1>Conf</h1>
      </div>
    );
  }
}


export default Conf;
