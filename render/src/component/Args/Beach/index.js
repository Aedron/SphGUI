
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button, InputNumber } from 'antd';
import Point from '../Point';
import Common from '../Common';
import { withStore } from '../../../store';

import "./index.scss";



@withStore
@observer
class Beach extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };
  onAddPoint = () => {
    const { props: { store, index } } = this;
    store.onAddPoint(index);
    // store.onAddPoint(index);
  };
  onDeletePoint = (i) => {
    const { props: { store, index } } = this;
    // store.onDeletePoint(index, i-1, 6);
    store.onDeletePoint(index, i, 3);
  };

  renderPoint = (p, i) => {
    const { props: { store, index } } = this;
    return (
      <div key={i} className="mainlist-arg-item point-item">
        <span>{i + 1}: </span>
        <Point
          showDelete
          point={toJS(p)}
          onChange={store.onChangePoint.bind(this, index, i)}
          onDelete={this.onDeletePoint.bind(this, i)}
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
          name="Beach"
        />
        <div className="line-points mainlist-item">
          <div className="mainlist-header">
            <span>点坐标</span>
            <Button
              icon="plus"
              onClick={this.onAddPoint}
            >添加点</Button>
          </div>
          <div className="mainlist-args">
            { data.points.map(this.renderPoint) }
          </div>
        </div>
      </div>
    );
  }
}


export default Beach;
