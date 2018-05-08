
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Tag, Radio, Button } from 'antd';

import Header from '../Header.js';
import Type from '../Type';
import DrawMode from '../DrawMode';
import ShapeMode from '../ShapeMode';
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
        <Header store={store} index={index} name="Line (线)" />
        <div className="mainlist-args">
          <Type store={store} index={index} />
          <DrawMode store={store} index={index} />
          <ShapeMode store={store} index={index} />
        </div>
      </div>
    );
  }
}


export default Model;
