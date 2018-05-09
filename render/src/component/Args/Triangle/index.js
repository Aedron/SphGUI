
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button, InputNumber, Radio } from 'antd';
import Common from '../Common';
import Point from '../Point';
import { withStore } from '../../../store';
import { data } from '../../../utils';

import "./index.scss";


const { typesMap } = data;
const { Group: RadioGroup, Button: RadioButton } = Radio;

@withStore
@observer
class Triangle extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  renderPoint = (p, i) => {
    const { props: { store, index } } = this;
    const { type } = store.mainList[index];
    return (
      <div key={i} className="mainlist-arg-item point-item">
        <span>{i + 1}: </span>
        <Point
          showDelete={type === typesMap.STRIP}
          point={toJS(p)}
          onChange={store.onChangePoint.bind(store, index, i)}
          onDelete={store.onDeletePoint.bind(store, index, i, 4)}
        />
      </div>
    );
  };

  render() {
    const { props: { store, index } } = this;
    const data = store.mainList[index];

    return (
      <div className="line mainlist-item">
        <Common
          store={store}
          index={index}
          name="Triangle (三角)"
        />
        <div className="line-points mainlist-item">
          <div className="mainlist-header">
            <span>点坐标</span>
            <div>
              <RadioGroup
                onChange={store.onChangeTriangleType.bind(store, index)}
                value={data.type}
              >
                <RadioButton value={typesMap.TRIANGLES}>triangles</RadioButton>
                <RadioButton value={typesMap.QUADRI}>quadri</RadioButton>
                <RadioButton value={typesMap.STRIP}>strip</RadioButton>
              </RadioGroup>
              <Button
                icon="plus"
                disabled={data.type !== typesMap.STRIP}
                onClick={store.onAddPoint.bind(store, index)}
              >添加点</Button>
            </div>
          </div>
          <div className="mainlist-args">
            { data.points.map(this.renderPoint) }
          </div>
        </div>
      </div>
    );
  }
}


export default Triangle;
