
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Radio, Popconfirm, Button, Checkbox } from 'antd';
import Point from '../Point';
import Common from '../Common';
import { data } from '../../../utils';
import { withStore } from '../../../store';

import "./index.scss";
import { fillTypeMap } from "../../../utils/data";


const { fillTypes, fillModes }  = data;
const { Group: RadioGroup, Button: RadioButton } = Radio;
const { Group: CheckboxGroup } = Checkbox;


@withStore
@observer
class Fill extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  renderPoint = (p, i) => {
    const { props: { store, index } } = this;
    const { fillType } = store.mainList[index];

    return (
      <div key={i} className="mainlist-arg-item point-item">
        <span>{i + 1}: </span>
        <Point
          showDelete
          point={toJS(p)}
          onChange={store.onChangePoint.bind(this, index, i)}
          onDelete={store.onDeletePoint.bind(store, index, i, fillType === fillTypeMap.FIGURE ? 4 : 6)}
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
          name="Fill (填充)"
        />
        <div
          className="mainlist-item"
          style={{ margin: '12px' }}
        >
          <div className="mainlist-header">
            <span>特征参数</span>
            <RadioGroup
              onChange={store.onChangeFillType.bind(store, index)}
              value={data.fillType}
              style={{ margin: 0 }}
            >
              <RadioButton
                for={f in fillTypes}
                value={f}
                key={f}
                style={{ margin: 0 }}
              >{f}</RadioButton>
            </RadioGroup>
          </div>
          <div className="mainlist-args">
            <div className="mainlist-arg-item">
              <span className="args-item-name">FillMode:</span>
              <CheckboxGroup
                options={fillModes.map(i => ({ label: i, value: i }))}
                onChange={store.onChangeFillMode.bind(store, index)}
                value={toJS(data.fillMode)}
              />
            </div>
            <div className="mainlist-arg-item">
              <span className="args-item-name">起始点:</span>
              <Point point={toJS(data.point)} onChange={store.onChangeSinglePoint.bind(store, index)}/>
            </div>
            <div if={data.fillType === fillTypeMap.BOX} className="mainlist-arg-item">
              <span className="args-item-name">顶点: </span>
              <Point point={toJS(data.points[0])} onChange={store.onChangePoint.bind(store, index, 0)} />
            </div>
            <div if={data.fillType === fillTypeMap.BOX} className="mainlist-arg-item">
              <span className="args-item-name">棱长: </span>
              <Point point={toJS(data.points[1])} onChange={store.onChangePoint.bind(store, index, 1)} />
            </div>
          </div>
        </div>
        <div
          className="line-points mainlist-item"
          if={[fillTypeMap.FIGURE, fillTypeMap.PRISM].includes(data.fillType)}
          style={{ margin: '12px' }}
        >
          <div className="mainlist-header">
            <span>点坐标</span>
            <Button
              icon="plus"
              onClick={store.onAddPoint.bind(store, index)}
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


export default Fill;
