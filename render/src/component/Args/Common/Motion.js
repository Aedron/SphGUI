import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import {Button, Radio, Timeline, InputNumber} from 'antd';

import { genTimeLine } from '../../../utils';
import Point from '../Point';

const {Group: RadioGroup, Button: RadioButton} = Radio;
const {Group: ButtonGroup} = Button;
const {Item: TimeItem}  = Timeline;


function Float(props) {
  const { store, index } = props;
  const { motion: rawMotion } = store.mainList[index];
  const motion = genTimeLine(rawMotion);

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
        { motion.map(renderMotionItem) }
      </div>
    </div>
  );

  function renderMotionItem(m, i) {
    const { start, duration, type } = m;
    return (
      <div
        className="line-points mainlist-item motion-item"
        key={i}
      >
        <div className="mainlist-header">
          <span>时间轴: {start} ~ {start+duration} 秒</span>
          <div>
            <RadioGroup
              value={type}
              onChange={store.onChangeMotionType.bind(store, index, i)}
            >
              <RadioButton value="linear">线性</RadioButton>
              <RadioButton value="rotate">旋转</RadioButton>
              <RadioButton value="sin">正弦</RadioButton>
              <RadioButton value="pause">静止</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="mainlist-args">
          {type === 'linear' && renderLinear(m, i)}
          {type === 'rotate' && renderRotate(m, i)}
          {type === 'sin' && renderSin(m, i)}
          {type === 'pause' && renderPause(m, i)}
        </div>
      </div>
    );
  }

  function renderLinear(m, i) {
    const { duration, vel, ace }  = m;
    return [
      <div
        className="mainlist-arg-item"
        key="0"
      >
        <span className="args-item-name">类型: </span>
        <RadioGroup
          value={!!ace}
          onChange={store.onToggleMotionAce.bind(store, index, i)}
        >
          <Radio value={false}>匀速</Radio>
          <Radio value={true}>加速</Radio>
        </RadioGroup>
      </div>,
      <div
        className="mainlist-arg-item"
        key="1"
      >
        <span className="args-item-name">持续时间: </span>
        <InputNumber
          min={0}
          value={duration}
          onChange={store.onChangeMotionDuration.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="2"
      >
        <span className="args-item-name">速度: </span>
        <Point
          point={toJS(vel)}
          onChange={store.onChangeMotionVel.bind(store, index, i)}
        />
      </div>,
      <div
        if={ace}
        className="mainlist-arg-item"
        key="3"
      >
        <span className="args-item-name">加速度: </span>
        <Point
          point={toJS(ace)}
          onChange={store.onChangeMotionAce.bind(store, index, i)}
        />
      </div>
    ]
  }
  function renderRotate(m, i) {
    const { duration, vel, ace, ref, axisp1, axisp2 } = m;

    let type;
    if (!ace && ace !== 0) type = 'rot';
    else if (!ref) type = 'rotace';
    else type = 'cirace';
    console.log(type);
    const onTypeChange = ({target: { value }}) => {
      switch (value) {
        case 'rot': {
          store.onChangeMotionValue(index, i, 'ace', null);
          store.onChangeMotionValue(index, i, 'ref', null);
          break;
        }
        case 'rotace': {
          store.onChangeMotionValue(index, i, 'ace', typeof ace === 'number' ? ace : 0);
          store.onChangeMotionValue(index, i, 'ref', null);
          break;
        }
        case 'cirace': {
          store.onChangeMotionValue(index, i, 'ace', typeof ace === 'number' ? ace : 0);
          store.onChangeMotionValue(index, i, 'ref', ref || [0, 0, 0]);
          break;
        }
      }
    };

    return [
      <div
        className="mainlist-arg-item"
        key="0"
      >
        <span className="args-item-name">类型: </span>
        <RadioGroup
          value={type}
          onChange={onTypeChange}
        >
          <Radio value="rot">匀速</Radio>
          <Radio value="rotace">加速</Radio>
          <Radio value="cirace">环绕</Radio>
        </RadioGroup>
      </div>,
      <div
        className="mainlist-arg-item"
        key="1"
      >
        <span className="args-item-name">持续时间: </span>
        <InputNumber
          min={0}
          value={duration}
          onChange={store.onChangeMotionDuration.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="2"
      >
        <span className="args-item-name">速度: </span>
        <InputNumber
          value={vel}
          onChange={store.onChangeMotionValue.bind(store, index, i, 'vel')}
        />
      </div>,
      <div
        if={type !== 'rot'}
        className="mainlist-arg-item"
        key="3"
      >
        <span className="args-item-name">加速度: </span>
        <InputNumber
          value={toJS(ace)}
          onChange={store.onChangeMotionValue.bind(store, index, i, 'ace')}
        />
      </div>,
      <div
        if={type === 'cirace'}
        className="mainlist-arg-item"
        key="5"
      >
        <span className="args-item-name">环绕点: </span>
        <Point
          point={toJS(ref)}
          onChange={store.onChangeMotionRef.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="4"
      >
        <span className="args-item-name">环绕轴: </span>
        <Point
          point={toJS(axisp1)}
          onChange={store.onChangeMotionAxisp1.bind(store, index, i)}
        />
        <Point
          point={toJS(axisp2)}
          onChange={store.onChangeMotionAxisp2.bind(store, index, i)}
        />
      </div>
    ];
  }
  function renderSin(m, i) {
    const {
      duration, ref, axisp1,
      axisp2, freq, ampl, phase
    }  = m;

    let type;
    if (!axisp1) type = 'rect';
    else if (!ref) type = 'rot';
    else type = 'cir';
    const onTypeChange = ({target: { value }}) => {
      switch (value) {
        case 'rect': {
          store.onChangeMotionValue(index, i, 'freq', [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'ampl', [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'phase', typeof phase === 'object' ? phase : [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'axisp1', null);
          store.onChangeMotionValue(index, i, 'axisp2', null);
          store.onChangeMotionValue(index, i, 'ref', null);
          break;
        }
        case 'rot': {
          store.onChangeMotionValue(index, i, 'freq', typeof freq === 'object' ? 0 : freq);
          store.onChangeMotionValue(index, i, 'ampl', typeof ampl === 'object' ? 0 : ampl);
          store.onChangeMotionValue(index, i, 'phase', typeof phase === 'object' ? 0 : phase);
          store.onChangeMotionValue(index, i, 'axisp1', axisp1 || [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'axisp2', axisp2 || [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'ref', null);
          break;
        }
        case 'cir': {
          store.onChangeMotionValue(index, i, 'freq', typeof freq === 'object' ? 0 : freq);
          store.onChangeMotionValue(index, i, 'ampl', typeof ampl === 'object' ? 0 : ampl);
          store.onChangeMotionValue(index, i, 'phase', typeof phase === 'object' ? 0 : phase);
          store.onChangeMotionValue(index, i, 'axisp1', axisp1 || [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'axisp2', axisp2 || [0, 0, 0]);
          store.onChangeMotionValue(index, i, 'ref', [0, 0, 0]);
          break;
        }
      }
    };

    return [
      <div
        className="mainlist-arg-item"
        key="0"
      >
        <span className="args-item-name">类型: </span>
        <RadioGroup
          value={type}
          onChange={onTypeChange}
        >
          <Radio value="rect">直线</Radio>
          <Radio value="rot">旋转</Radio>
          <Radio value="cir">环绕</Radio>
        </RadioGroup>
      </div>,
      <div
        className="mainlist-arg-item"
        key="1"
      >
        <span className="args-item-name">持续时间: </span>
        <InputNumber
          min={0}
          value={duration}
          onChange={store.onChangeMotionDuration.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="2"
      >
        <span className="args-item-name">Freq: </span>
        <Point
          if={type === 'rect'}
          point={toJS(freq)}
          onChange={store.onChangeMotionFreq.bind(store, index, i)}
        />
        <InputNumber
          else
          value={freq}
          onChange={store.onChangeMotionValue.bind(store, index, i, 'freq')}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="3"
      >
        <span className="args-item-name">Ampl: </span>
        <Point
          if={type === 'rect'}
          point={toJS(ampl)}
          onChange={store.onChangeMotionAmpl.bind(store, index, i)}
        />
        <InputNumber
          else
          value={ampl}
          onChange={store.onChangeMotionValue.bind(store, index, i, 'ampl')}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="4"
        if={type !== 'rot'}
      >
        <span className="args-item-name">Phase: </span>
        <Point
          if={type === 'rect'}
          point={toJS(phase)}
          onChange={store.onChangeMotionPhase.bind(store, index, i)}
        />
        <InputNumber
          else
          value={phase}
          onChange={store.onChangeMotionValue.bind(store, index, i, 'phase')}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="5"
        if={type === 'cir'}
      >
        <span className="args-item-name">Ref: </span>
        <Point
          point={toJS(ref)}
          onChange={store.onChangeMotionRef.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="6"
        if={type !== 'rect'}
      >
        <span className="args-item-name">Axisp1: </span>
        <Point
          point={toJS(axisp1)}
          onChange={store.onChangeMotionAxisp1.bind(store, index, i)}
        />
      </div>,
      <div
        className="mainlist-arg-item"
        key="7"
        if={type !== 'rect'}
      >
        <span className="args-item-name">Axisp2: </span>
        <Point
          point={toJS(axisp2)}
          onChange={store.onChangeMotionAxisp2.bind(store, index, i)}
        />
      </div>,
    ];
  }
  function renderPause(m, i) {
    const { duration }  = m;
    return (
      <div className="mainlist-arg-item">
        <span className="args-item-name">持续时间: </span>
        <InputNumber
          min={0}
          value={duration}
          onChange={store.onChangeMotionDuration.bind(store, index, i)}
        />
      </div>
    );
  }
}

Float.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Float);
