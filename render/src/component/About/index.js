
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";



@withStore
@observer
class About extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className={`about ${store.view === 'about' ? 'active' : ''}`}>
        <h1>About</h1>
      </div>
    );
  }
}


export default About;
