
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Radio, Button, Popconfirm, InputNumber } from 'antd';
import Point from '../Point';
import { withStore } from '../../../store';

import "./index.scss";

const { Group: RadioGroup, Button: RadioButton } = Radio;



@withStore
@observer
class Wave extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  render() {
    const { props: { store, index } } = this;
    const {
      isRegular, duration, depth,
      fixedDepth, direction, height,
      period, phase, ramp, spectrum,
      discretization, peakCof, waves,
      randomSeed, serieIni, rampTime
    } = store.waves[index];

    return (
      <div className="wave-item">
        <div className="wave-header">
          <span>{isRegular ? '规则波' : '不规则波'}</span>
          <div>
            <RadioGroup value={isRegular} onChange={store.onChangeWaveType.bind(store, index)}>
              <RadioButton value={true}>规则波</RadioButton>
              <RadioButton value={false}>不规则波</RadioButton>
            </RadioGroup>
            <Popconfirm
              title="确定删除波浪?"
              onConfirm={store.onDeleteWave.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="danger"
                icon="delete"
              >删除</Button>
            </Popconfirm>
          </div>
        </div>
        <div className="wave-args">
          <div className="wave-arg-item">
            <span className="args-item-name">持续时间: </span>
            <InputNumber
              value={duration}
              onChange={store.onChangeWaveValue.bind(store, index, 'duration')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">波浪深度: </span>
            <InputNumber
              value={depth}
              onChange={store.onChangeWaveValue.bind(store, index, 'depth')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">FixedDepth: </span>
            <InputNumber
              value={fixedDepth}
              onChange={store.onChangeWaveValue.bind(store, index, 'fixedDepth')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">方向: </span>
            <Point
              point={toJS(direction)}
              onChange={store.onChangeWaveDirection.bind(store, index)}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">高度: </span>
            <InputNumber
              value={height}
              onChange={store.onChangeWaveValue.bind(store, index, 'height')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">周期: </span>
            <InputNumber
              value={period}
              onChange={store.onChangeWaveValue.bind(store, index, 'period')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">phase: </span>
            <InputNumber
              value={phase}
              onChange={store.onChangeWaveValue.bind(store, index, 'phase')}
              min={0}
            />
          </div>
          <div className="wave-arg-item">
            <span className="args-item-name">ramp: </span>
            <InputNumber
              value={ramp}
              onChange={store.onChangeWaveValue.bind(store, index, 'ramp')}
              min={0}
            />
          </div>
          <div className="wave-arg-item" if={spectrum}>
            <span className="args-item-name">Spectrum: </span>
            <RadioGroup
              value={spectrum.value}
              onChange={store.onChangeWaveOption.bind(store, index, 'spectrum')}
            >
              <Radio
                for={(v, i) in spectrum.options}
                key={i}
                value={v}
              >{v}</Radio>
            </RadioGroup>
          </div>
          <div className="wave-arg-item" if={discretization}>
            <span className="args-item-name">Discretization: </span>
            <RadioGroup
              value={discretization.value}
              onChange={store.onChangeWaveOption.bind(store, index, 'discretization')}
            >
              <Radio
                for={(v, i) in discretization.options}
                key={i}
                value={v}
              >{v}</Radio>
            </RadioGroup>
          </div>
          <div className="wave-arg-item" if={peakCof || peakCof === 0}>
            <span className="args-item-name">PeakCoef: </span>
            <InputNumber
              value={peakCoef}
              onChange={store.onChangeWaveValue.bind(store, index, 'peakCoef')}
              min={0}
            />
          </div>
          <div className="wave-arg-item" if={waves || waves === 0}>
            <span className="args-item-name">Waves: </span>
            <InputNumber
              value={waves}
              onChange={store.onChangeWaveValue.bind(store, index, 'waves')}
              min={0}
            />
          </div>
          <div className="wave-arg-item" if={randomSeed || randomSeed === 0}>
            <span className="args-item-name">RandomSeed: </span>
            <InputNumber
              value={randomSeed}
              onChange={store.onChangeWaveValue.bind(store, index, 'randomSeed')}
              min={0}
            />
          </div>
          <div className="wave-arg-item" if={serieIni || serieIni === 0}>
            <span className="args-item-name">SerieIni: </span>
            <InputNumber
              value={serieIni}
              onChange={store.onChangeWaveValue.bind(store, index, 'serieIni')}
              min={0}
            />
          </div>
          <div className="wave-arg-item" if={rampTime || rampTime === 0}>
            <span className="args-item-name">RampTime: </span>
            <InputNumber
              value={rampTime}
              onChange={store.onChangeWaveValue.bind(store, index, 'rampTime')}
              min={0}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default Wave;
