
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Common from '../Common';
import { withStore } from '../../../store';

import "./index.scss";



@withStore
@observer
class Model extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  render() {
    const { props: { store, index } } = this;

    return (
      <div className="line mainlist-item">
        <Common store={store} index={index} name="Line (线)" />
      </div>
    );
  }
}


export default Model;
