
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Button, InputNumber, Radio } from 'antd';
import Common from '../Common';
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
        {
          p.map((v, j) => [
            <span key="0">{['X', 'Y', 'Z'][j]}</span>,
            <InputNumber
              key="1"
              value={v}
              className="small-input"
              size="small"
              onChange={store.onChangeLinePoint.bind(store, index, i, j)}
          />
          ])
        }
        <Button
          if={type === typesMap.STRIP}
          type="danger"
          shape="circle"
          icon="close"
          size="small"
          onClick={store.onDeleteTrianglePoint.bind(store, index, i)}
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
                onClick={store.onAddLinePoint.bind(store, index)}
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
