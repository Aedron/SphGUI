
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Popconfirm } from 'antd';


const { Group: ButtonGroup } = Button;


function Header(props) {
  const { index, store, name } = props;
  const data = store.mainList[index];
  const { transform: { move, scale, rotate } } = data;
  console.log(move, scale, rotate);

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
        <Popconfirm
          title="确定删除该物件?"
          onConfirm={store.onDeleteObject.bind(store, index)}
          okText="确认"
          cancelText="取消"
        >
          <Button
            type="danger"
            icon="delete"
          />
        </Popconfirm>
      </div>
    </div>
  );
}


Header.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};


export default observer(Header);
