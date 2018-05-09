
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Radio, InputNumber } from 'antd';

import Point from '../Point';


const { Group: RadioGroup } = Radio;


function Initial(props) {
  const { store, index } = props;
  const { initial: { velocity, wave } } = store.mainList[index];

  return [
    <div if={velocity} className="mainlist-arg-item" key="velocity">
      <span className="args-item-name">速度:</span>
      <Point point={toJS(velocity)} onChange={store.onChangeInitVelocity.bind(store, index)} />
    </div>,
    <div if={wave} className="mainlist-arg-item" key="wave">
      <span className="args-item-name">波浪:</span>
      <Point point={toJS(wave)} onChange={store.onChangeInitWave.bind(store, index)} />
    </div>
  ]
}

Initial.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Initial);
