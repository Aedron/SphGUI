
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { InputNumber } from 'antd';
import Point from '../Point';
import Common from '../Common';
import { withStore } from '../../../store';
import { data } from '../../../utils';

import "./index.scss";
import {boxFillMap} from "../../../utils/data";


const { typesMap, boxFills } = data;

@withStore
@observer
class Cylinder extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  render() {
    const { props: { store, index } } = this;
    const data = store.mainList[index];

    return (
      <div className="box mainlist-item">
        <Common
          store={store}
          index={index}
          name="Cylinder (圆柱)"
        />
        <div className="mainlist-arg-item">
          <span className="args-item-name">底面圆心: </span>
          <Point point={toJS(data.points[0])} onChange={store.onChangePoint.bind(store, index, 0)}/>
        </div>
        <div className="mainlist-arg-item">
          <span className="args-item-name">顶面圆心: </span>
          <Point point={toJS(data.points[1])} onChange={store.onChangePoint.bind(store, index, 1)}/>
        </div>
        <div className="mainlist-arg-item">
          <span className="args-item-name">半径: </span>
          <InputNumber value={data.radius} min={0} onChange={store.onChangeRadius.bind(store, index)} />
        </div>
      </div>
    );
  }
}


export default Cylinder;
