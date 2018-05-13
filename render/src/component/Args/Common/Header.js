import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Button, Popconfirm, Checkbox} from 'antd';


const {Group: ButtonGroup} = Button;


function Header(props) {
  const {index, store, name, operator} = props;
  const data = store.mainList[index];
  const {
    transform: {move, scale, rotate},
    initial: {velocity, wave},
    wave: {regular, irregular},
    float, motion
  } = data;

  return (
    <div className="mainlist-header">
      <span>{name}</span>
      <div className="ant-checkbox-group">
        {/*漂浮*/}
        <Popconfirm
          if={float}
          title="确定删除漂浮物属性?"
          onConfirm={store.onToggleFloat.bind(store, index)}
          okText="确认"
          cancelText="取消"
        >
          <Checkbox checked={true}>漂浮</Checkbox>
        </Popconfirm>
        <Checkbox
          else
          checked={false}
          onChange={store.onToggleFloat.bind(store, index)}
        >漂浮</Checkbox>
        {/*运动*/}
        <Popconfirm
          if={motion}
          title="确定删除运动属性?"
          onConfirm={store.onToggleMotion.bind(store, index)}
          okText="确认"
          cancelText="取消"
        >
          <Checkbox checked={true}>运动</Checkbox>
        </Popconfirm>
        <Checkbox
          else
          checked={false}
          onChange={store.onToggleMotion.bind(store, index)}
        >运动</Checkbox>

        {/*规则波*/}
        <Popconfirm
          if={regular}
          title="确定删除规则波属性?"
          onConfirm={store.onToggleWave.bind(store, index, true)}
          okText="确认"
          cancelText="取消"
        >
          <Checkbox checked={true}>规则波</Checkbox>
        </Popconfirm>
        <Checkbox
          else
          checked={false}
          onChange={store.onToggleWave.bind(store, index, true)}
        >规则波</Checkbox>
        {/*不规则波*/}
        <Popconfirm
          if={irregular}
          title="确定删除规则波属性?"
          onConfirm={store.onToggleWave.bind(store, index, false)}
          okText="确认"
          cancelText="取消"
        >
          <Checkbox checked={true}>不规则波</Checkbox>
        </Popconfirm>
        <Checkbox
          else
          checked={false}
          onChange={store.onToggleWave.bind(store, index, false)}
        >不规则波</Checkbox>

        {/*Delete*/}
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
