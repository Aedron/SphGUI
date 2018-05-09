
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Button, InputNumber } from 'antd';
import Common from '../Common';
import { withStore } from '../../../store';

import "./index.scss";



@withStore
@observer
class Prism extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };
  onAddPoint = () => {
    const { props: { store, index } } = this;
    store.onAddPoint(index);
    store.onAddPoint(index);
  };
  onDeletePoint = (i) => {
    const { props: { store, index } } = this;
    store.onDeletePoint(index, i-1, 6);
    store.onDeletePoint(index, i-1, 6);
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
              onChange={store.onChangePoint.bind(this, index, i, j)}
          />
          ])
        }
        <Button
          if={i % 2 === 1}
          type="danger"
          shape="circle"
          icon="close"
          size="small"
          onClick={this.onDeletePoint.bind(this, i)}
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
          name="Prism (棱柱)"
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


export default Prism;
