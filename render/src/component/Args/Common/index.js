import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { data } from '../../../utils';

import Header from './Header.js';
import Type from './Type';
import DrawMode from './DrawMode';
import ShapeMode from './ShapeMode';
import Transform from './Transform';
import Initial from './Initial';
import Float from './Float';

const { floatAttrMap } = data;


function Common(props) {
  const {store, index, name, operator} = props;

  return [
    <Header
      key="0"
      store={store}
      index={index}
      name={name}
      operator={operator}
    />,
    <div key="1" className="mainlist-args">
      <Type store={store} index={index}/>
      <DrawMode store={store} index={index}/>
      <ShapeMode store={store} index={index}/>
      <Transform store={store} index={index}/>
      <Initial store={store} index={index}/>
    </div>,
    <Float key="2" store={store} index={index}/>
  ];
}

Common.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
  operator: PropTypes.func
};
Common.defaultProps = {
  operator: () => {
  }
};


export default observer(Common);
