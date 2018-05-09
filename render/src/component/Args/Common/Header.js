import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Button, Popconfirm} from 'antd';


const {Group: ButtonGroup} = Button;


function Header(props) {
  const {index, store, name, operator} = props;
  const data = store.mainList[index];
  const {
    transform: {move, scale, rotate},
    initial: {velocity, wave}
  } = data;

  return (
    <div className="mainlist-header">
      <span>{name}</span>
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
            <Button type="primary" icon="right">速度</Button>
          </Popconfirm>
          <Button
            else
            icon="right"
            onClick={store.onToggleInitVelocity.bind(store, index)}
          >速度</Button>
          <Popconfirm
            if={wave}
            title="确定删除初始孤立波属性?"
            onConfirm={store.onToggleInitWave.bind(store, index)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" icon="double-right">波浪</Button>
          </Popconfirm>
          <Button
            else
            icon="double-right"
            onClick={store.onToggleInitWave.bind(store, index)}
          >波浪</Button>
        </ButtonGroup>

        <Popconfirm
          title="确定删除该物件?"
          onConfirm={store.onDeleteObject.bind(store, index)}
          okText="确认"
          cancelText="取消"
        >
          <Button
            type="danger"
            icon="delete"
          >删除</Button>
        </Popconfirm>
        {operator()}
      </div>
    </div>
  );
}


Header.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
  operator: PropTypes.func.isRequired
};


export default observer(Header);
