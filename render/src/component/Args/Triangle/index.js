
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Popover, Radio } from 'antd';
import Common from '../Common';
import Point from '../Point';
import { withStore } from '../../../store';
import { data } from '../../../utils';
import Quadri from '../../../static/docPics/quadri.png';
import Strip from '../../../static/docPics/strip.png';

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
                <Popover
                  mouseEnterDelay={0.5}
                  content={(
                    <div className="doc">
                      <p>用三个点绘制一个三角形</p>
                    </div>
                  )}
                  title="Triangle"
                >
                  <RadioButton value={typesMap.TRIANGLES}>triangle</RadioButton>
                </Popover>
                <Popover
                  mouseEnterDelay={0.5}
                  content={(
                    <div className="doc">
                      <p>通过四个点绘制由两个三角形组成的四边形(两个三角可以不在一个平面)</p>
                      <img src={Quadri} />
                    </div>
                  )}
                  title="Triangle"
                >
                  <RadioButton value={typesMap.QUADRI}>quadri</RadioButton>
                </Popover>
                <Popover
                  mouseEnterDelay={0.5}
                  content={(
                    <div className="doc">
                      <p>绘制一系列链式三角形</p>
                      <img src={Strip} />
                    </div>
                  )}
                  title="Triangle"
                >
                  <RadioButton value={typesMap.STRIP}>strip</RadioButton>
                </Popover>
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
