
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Radio, Popover } from 'antd';

import { data } from '../../../utils';
import DrawModePic from '../../../static/docPics/draw-mode.png';


const { drawModes } = data;
const { Group: RadioGroup } = Radio;


function DrawMode(props) {
  const { store, index } = props;
  const data = store.mainList[index];

  return (
    <div className="mainlist-arg-item">
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>指示创建粒子生成点的模式</p>
            <img src={DrawModePic} />
          </div>
        )}
        title="DrawMode"
      >
        <span className="args-item-name">DrawMode:</span>
      </Popover>
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
