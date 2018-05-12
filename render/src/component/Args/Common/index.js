import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { data } from '../../../utils';
import { Radio, Button, Popconfirm } from 'antd';

import Header from './Header.js';
import Type from './Type';
import DrawMode from './DrawMode';
import ShapeMode from './ShapeMode';
import Transform from './Transform';
import Initial from './Initial';
import Float from './Float';
import Motion from './Motion';

import './index.scss';


const { floatAttrMap } = data;
const {Group: RadioGroup} = Radio;
const {Group: ButtonGroup} = Button;


function Common(props) {
  const {store, index, name, operator} = props;
  const data = store.mainList[index];
  const {
    transform: {move, scale, rotate},
    initial: {velocity, wave},
  } = data;

  return [
    <Header
      key="0"
      store={store}
      index={index}
      name={name}
      operator={operator}
    />,
    <div key="1" className="line-points mainlist-item">
      <div className="mainlist-header">
        <span>通用参数</span>
        <div>
          <ButtonGroup>
            <Popconfirm
              if={move}
              title="确定删除移动属性?"
              onConfirm={store.onToggleTransformMove.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" icon="swap">移动</Button>
            </Popconfirm>
            <Button
              else
              icon="swap"
              onClick={store.onToggleTransformMove.bind(store, index)}
            >移动</Button>
            <Popconfirm
              if={scale}
              title="确定删除缩放属性?"
              onConfirm={store.onToggleTransformScale.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" icon="arrows-alt">缩放</Button>
            </Popconfirm>
            <Button
              else
              icon="arrows-alt"
              onClick={store.onToggleTransformScale.bind(store, index)}
            >缩放</Button>
            <Popconfirm
              if={rotate}
              title="确定删除旋转属性?"
              onConfirm={store.onToggleTransformRotate.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" icon="retweet">旋转</Button>
            </Popconfirm>
            <Button
              else
              icon="retweet"
              onClick={store.onToggleTransformRotate.bind(store, index)}
            >旋转</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Popconfirm
              if={velocity}
              title="确定删除初始速度属性?"
              onConfirm={store.onToggleInitVelocity.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" icon="right">初始速度</Button>
            </Popconfirm>
            <Button
              else
              icon="right"
              onClick={store.onToggleInitVelocity.bind(store, index)}
            >初始速度</Button>

            <Popconfirm
              if={wave}
              title="确定删除初始孤立波属性?"
              onConfirm={store.onToggleInitWave.bind(store, index)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" icon="double-right">初始波浪</Button>
            </Popconfirm>
            <Button
              else
              icon="double-right"
              onClick={store.onToggleInitWave.bind(store, index)}
            >初始波浪</Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="mainlist-args">
        <Type store={store} index={index}/>
        <DrawMode store={store} index={index}/>
        <ShapeMode store={store} index={index}/>
        <Transform store={store} index={index}/>
        <Initial store={store} index={index}/>
      </div>
    </div>,
    <Float key="2" store={store} index={index}/>,
    <Motion key="3" store={store} index={index}/>,
  ];
}

Common.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
  operator: PropTypes.func
};
Common.defaultProps = {
  operator: () => {
  }
};


export default observer(Common);
