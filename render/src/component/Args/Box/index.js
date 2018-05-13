
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button, InputNumber, Radio, Checkbox } from 'antd';
import Point from '../Point';
import Common from '../Common';
import { withStore } from '../../../store';
import { data } from '../../../utils';

import "./index.scss";
import {boxFillMap} from "../../../utils/data";


const { typesMap, boxFills } = data;
const { Group: RadioGroup, Button: RadioButton } = Radio;
const { Group: CheckboxGroup } = Checkbox;

@withStore
@observer
class Box extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  renderPoint = (p, i) => {
    const { props: { store, index } } = this;
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
              onChange={store.onChangePoint.bind(store, index, i, j)}
          />
          ])
        }
      </div>
    );
  };

  render() {
    const { props: { store, index } } = this;
    const data = store.mainList[index];

    return (
      <div className="box mainlist-item">
        <Common
          store={store}
          index={index}
          name="Box (立方体)"
        />
        <div className="line-points mainlist-item">
          <div className="mainlist-header">
            <span>特征参数</span>
            <div>
            </div>
          </div>
          <div className="mainlist-args">
            <div className="mainlist-arg-item">
              <span className="args-item-name">BoxFill</span>
              <Checkbox
                for={c in boxFills}
                onChange={store.onChangeBoxFill.bind(store, index, c)}
                checked={data.boxFill.includes(c)}
                disabled={data.boxFill.includes(boxFillMap.ALL) && ![boxFillMap.ALL, boxFillMap.SOLID].includes(c)}
                key={c}
              >{c}</Checkbox>
            </div>
            <div className="mainlist-arg-item">
              <span className="args-item-name">顶点: </span>
              <Point point={toJS(data.points[0])} onChange={store.onChangePoint.bind(store, index, 0)} />
            </div>
            <div className="mainlist-arg-item">
              <span className="args-item-name">棱长: </span>
              <Point point={toJS(data.points[1])} onChange={store.onChangePoint.bind(store, index, 1)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Box;
