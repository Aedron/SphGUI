import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import {Button, Radio} from 'antd';

import Point from '../Point';

const {Group: RadioGroup} = Radio;
const {Group: ButtonGroup} = Button;


function Float(props) {
  const { store, index } = props;
  const { motion } = store.mainList[index];

  return (
    <div if={motion} className="line-points mainlist-item">
      <div className="mainlist-header">
        <span>运动设置</span>
        <div>

        </div>
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
