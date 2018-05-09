
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
class Sphere extends Component {
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
      <div className="sphere mainlist-item">
        <Common
          store={store}
          index={index}
          name="Sphere (球)"
        />
        <div className="mainlist-arg-item">
          <span className="args-item-name">半径: </span>
          <Point point={toJS(data.point)} onChange={store.onChangeSinglePoint.bind(store, index)} />
        </div>
        <div className="mainlist-arg-item">
          <span className="args-item-name">半径: </span>
          <InputNumber value={data.radius} min={0} onChange={store.onChangeRadius.bind(store, index)} />
        </div>
      </div>
    );
  }
}


export default Sphere;
