import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import {Button, Radio, Timeline, InputNumber} from 'antd';

import Point from '../Point';

const {Group: RadioGroup, Button: RadioButton} = Radio;
const {Group: ButtonGroup} = Button;
const {Item: TimeItem}  = Timeline;


function Float(props) {
  const { store, index } = props;
  const { motion: rawMotion } = store.mainList[index];
  let start = 0;
  const motion = (rawMotion || []).map((item, index) => {
    if (index === 0) start = 0;
    const i = {
      ...item,
      start: start
    };
    start += i.duration;
    return i;
  });

  return (
    <div if={rawMotion} className="line-points mainlist-item motion">
      <div className="mainlist-header">
        <span>运动设置</span>
        <div>
          <Button
            icon="plus"
            onClick={store.onAddMotion.bind(store, index)}
          >添加运动</Button>
        </div>
      </div>
      <div className="mainlist-args">
        <Timeline>
          <TimeItem
            for={(m, i) in motion}
            key={i}
            color={m.type === 'pause' ? "red" : "green"}
          >
            <span>{m.start}~{m.start + m.duration}秒</span>
            <RadioGroup
              value={m.type}
              onChange={store.onChangeMotionType.bind(store, index, i)}
            >
              <RadioButton value="move">匀速</RadioButton>
              <RadioButton value="ace">加速</RadioButton>
              <RadioButton value="pause">静止</RadioButton>
            </RadioGroup>
            <div>
              <span>时长</span>
              <InputNumber
                min={0}
                value={m.duration}
                onChange={store.onChangeMotionDuration.bind(store, index, i)}
                style={{ width: '70px' }}
              />
            </div>
            <div if={m.vel}>
              <span>速度</span>
              <Point
                point={toJS(m.vel)}
                onChange={store.onChangeMotionVel.bind(store, index, i)}
              />
            </div>
            <div if={m.ace}>
              <span>加速度</span>
              <Point
                point={toJS(m.ace)}
                onChange={store.onChangeMotionAcc.bind(store, index, i)}
              />
            </div>
            <Button
              type="danger"
              shape="circle"
              icon="close"
              size="small"
              onClick={store.onDeleteMotion.bind(store, index, i)}
              style={{ margin: 0 }}
            />
          </TimeItem>
        </Timeline>
      </div>
    </div>
  );
}

Float.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Float);
