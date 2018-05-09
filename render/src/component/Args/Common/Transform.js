
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Radio, InputNumber, Input } from 'antd';

import Point from '../Point';


const { Group: RadioGroup } = Radio;


function Transform(props) {
  const { store, index } = props;
  const { transform: { move, scale, rotate } } = store.mainList[index];

  return [
    <div if={move} className="mainlist-arg-item" key="move">
      <span className="args-item-name">移动:</span>
      <Point point={toJS(move)} onChange={store.onChangeTransformMove.bind(store, index)}/>
    </div>,
    <div if={scale} className="mainlist-arg-item" key="scale">
      <span className="args-item-name">缩放:</span>
      <Point point={toJS(scale)} onChange={store.onChangeTransformScale.bind(store, index)}/>
    </div>,
    <div if={rotate} className="mainlist-arg-item" key="rotate">
      <span className="args-item-name">旋转:</span>
      <Point
        point={toJS(rotate)}
        onChange={store.onChangeTransformRotate.bind(store, index)}
        comment={['X', 'Y', 'Z', '角度']}
        style={{ width: '240px' }}
      />
    </div>
  ]
}

Transform.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Transform);
