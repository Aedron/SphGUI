
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Radio, InputNumber, Input } from 'antd';

import Point from '../Point';


const { Group: RadioGroup } = Radio;


function Float(props) {
  const { store, index } = props;
  const {float} = store.mainList[index];

  return (
    <div if={float} className="line-points mainlist-item">
      <div className="mainlist-header">
        <span>漂浮物设置</span>

      </div>
      <div className="mainlist-args">

      </div>
    </div>
  );
}

Float.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Float);
