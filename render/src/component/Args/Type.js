
import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { observer } from 'mobx-react';


const { Group: RadioGroup } = Radio;


function Type(props) {
  const { store, index } = props;
  const data = store.mainList[index];

  return (
    <div className="mainlist-arg-item">
      <span className="args-item-name">类型:</span>
      <RadioGroup
        onChange={store.onChangeType.bind(store, index)}
        value={data.isFluid ? 'fluid' : 'bound'}
      >
        <Radio value="bound">Boundary(边界)</Radio>
        <Radio value="fluid">Fluid(流体)</Radio>
      </RadioGroup>
    </div>
  )
}

Type.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Type);
