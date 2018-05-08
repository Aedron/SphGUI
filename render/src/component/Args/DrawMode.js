
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Radio } from 'antd';

import { data } from '../../utils';


const { drawModes } = data;
const { Group: RadioGroup } = Radio;


function DrawMode(props) {
  const { store, index } = props;
  const data = store.mainList[index];

  return (
    <div className="mainlist-arg-item">
      <span className="args-item-name">DrawMode:</span>
      <RadioGroup
        onChange={store.onChangeDrawMode.bind(store, index)}
        value={data.drawMode}
      >
        <Radio
          for={m in drawModes}
          value={m}
          key={m}
        >{m}</Radio>
      </RadioGroup>
    </div>
  )
}

DrawMode.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(DrawMode);
