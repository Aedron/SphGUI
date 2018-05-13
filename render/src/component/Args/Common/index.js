import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { data } from '../../../utils';
import { Radio, Button, Popconfirm, Checkbox } from 'antd';

import Header from './Header.js';
import Type from './Type';
import DrawMode from './DrawMode';
import ShapeMode from './ShapeMode';
import Transform from './Transform';
import Initial from './Initial';
import Float from './Float';
import Motion from './Motion';
import Wave from './Wave';

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
          {/*移动*/}
          <Popconfirm
            if={move}
            title="确定删除移动属性?"
            onConfirm={store.onToggleTransformMove.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Checkbox checked={true}>移动</Checkbox>
          </Popconfirm>
          <Checkbox
            else
            onChange={store.onToggleTransformMove.bind(store, index)}
            checked={false}
          >移动</Checkbox>
          {/*缩放*/}
          <Popconfirm
            if={scale}
            title="确定删除移动属性?"
            onConfirm={store.onToggleTransformScale.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Checkbox checked={true}>缩放</Checkbox>
          </Popconfirm>
          <Checkbox
            else
            onChange={store.onToggleTransformScale.bind(store, index)}
            checked={false}
          >缩放</Checkbox>
          {/*旋转*/}
          <Popconfirm
            if={rotate}
            title="确定删除旋转属性?"
            onConfirm={store.onToggleTransformRotate.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Checkbox checked={true}>旋转</Checkbox>
          </Popconfirm>
          <Checkbox
            else
            checked={false}
            onChange={store.onToggleTransformRotate.bind(store, index)}
          >旋转</Checkbox>

          {/*初始速度*/}
          <Popconfirm
            if={velocity}
            title="确定删除初始速度属性?"
            onConfirm={store.onToggleInitVelocity.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Checkbox checked={true}>初始速度</Checkbox>
          </Popconfirm>
          <Checkbox
            else
            checked={false}
            onClick={store.onToggleInitVelocity.bind(store, index)}
          >初始速度</Checkbox>
          {/*初始波浪*/}
          <Popconfirm
            if={wave}
            title="确定删除初始孤立波属性?"
            onConfirm={store.onToggleInitWave.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Checkbox checked={true}>初始波浪</Checkbox>
          </Popconfirm>
          <Checkbox
            else
            checked={false}
            onChange={store.onToggleInitWave.bind(store, index)}
          >初始波浪</Checkbox>
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
    <Wave key="4" store={store} index={index}/>
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
