
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Radio, InputNumber, Input } from 'antd';


const { Group: RadioGroup } = Radio;


function Transform(props) {
  const { store, index } = props;
  const { transform: { move, scale, rotate } } = store.mainList[index];

  return [
    <div if={move} className="mainlist-arg-item" key="move">
      <span className="args-item-name">移动:</span>
      <InputNumber
        for={(m, i) in move}
        value={m}
        key={i}
        onChange={store.onChangeTransformMove.bind(store, index, i)}
        min={0}
        size="small"
        className="small-input"
      />
    </div>,
    <div if={scale} className="mainlist-arg-item" key="scale">
      <span className="args-item-name">缩放:</span>
      <InputNumber
        for={(m, i) in scale}
        value={m}
        key={i}
        onChange={store.onChangeTransformScale.bind(store, index, i)}
        min={0}
        size="small"
        className="small-input"
      />
    </div>,
    <div if={rotate} className="mainlist-arg-item" key="rotate">
      <span className="args-item-name">旋转:</span>
      <InputNumber
        for={(m, i) in rotate}
        value={m}
        key={i}
        onChange={store.onChangeTransformRotate.bind(store, index, i)}
        min={0}
        size="small"
        className="small-input"
      />
    </div>
  ]
}

Transform.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Transform);
