
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Radio, Button, Popconfirm, InputNumber } from 'antd';
import Point from '../Point';
import { withStore } from '../../../store';

import "./index.scss";

const { Group: RadioGroup, Button: RadioButton } = Radio;



function Wave(props) {
  const { store, index } = props;
  const { regular, irregular } = store.mainList[index].wave;

  return [
    <div key="0" if={regular} className="line-points mainlist-item motion">
      <div className="mainlist-header">
        <span>规则波</span>
        <div>
        </div>
      </div>
      <div className="mainlist-args">
        { renderWave(regular, true) }
      </div>
    </div>,
    <div key="1" if={irregular} className="line-points mainlist-item motion">
      <div className="mainlist-header">
        <span>不规则波</span>
        <div>
        </div>
      </div>
      <div className="mainlist-args">
        { renderWave(irregular, false) }
      </div>
    </div>,
  ];

  function renderWave(wave, isRegular) {
    const {
      duration, depth,
      fixedDepth, direction, height,
      period, phase, ramp, spectrum,
      discretization, peakCoef, waves,
      randomSeed, serieIni, rampTime
    } = wave;
    return (
      <div className="wave-args">
        <div className="wave-arg-item">
          <span className="args-item-name">持续时间: </span>
          <InputNumber
            value={duration}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'duration')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">波浪深度: </span>
          <InputNumber
            value={depth}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'depth')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">FixedDepth: </span>
          <InputNumber
            value={fixedDepth}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'fixedDepth')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">方向: </span>
          <Point
            point={toJS(direction)}
            onChange={store.onChangeWaveDirection.bind(store, index, isRegular)}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">高度: </span>
          <InputNumber
            value={height}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'height')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">周期: </span>
          <InputNumber
            value={period}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'period')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">phase: </span>
          <InputNumber
            value={phase}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'phase')}
            min={0}
          />
        </div>
        <div className="wave-arg-item">
          <span className="args-item-name">ramp: </span>
          <InputNumber
            value={ramp}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'ramp')}
            min={0}
          />
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">Spectrum: </span>
          <RadioGroup
            value={spectrum.value}
            onChange={store.onChangeWaveOption.bind(store, index, isRegular, 'spectrum')}
          >
            <Radio
              for={(v, i) in spectrum.options}
              key={i}
              value={v}
            >{v}</Radio>
          </RadioGroup>
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">Discretization: </span>
          <RadioGroup
            value={discretization.value}
            onChange={store.onChangeWaveOption.bind(store, index, isRegular, 'discretization')}
          >
            <Radio
              for={(v, i) in discretization.options}
              key={i}
              value={v}
            >{v}</Radio>
          </RadioGroup>
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">PeakCoef: </span>
          <InputNumber
            value={peakCoef}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'peakCoef')}
            min={0}
          />
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">Waves: </span>
          <InputNumber
            value={waves}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'waves')}
            min={0}
          />
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">RandomSeed: </span>
          <InputNumber
            value={randomSeed}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'randomSeed')}
            min={0}
          />
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">SerieIni: </span>
          <InputNumber
            value={serieIni}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'serieIni')}
            min={0}
          />
        </div>
        <div className="wave-arg-item" if={!isRegular}>
          <span className="args-item-name">RampTime: </span>
          <InputNumber
            value={rampTime}
            onChange={store.onChangeWaveValue.bind(store, index, isRegular, 'rampTime')}
            min={0}
          />
        </div>
      </div>
    );
  }
}


Wave.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default observer(Wave);
