
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';



function Header(props) {
  const { index, store, name } = props;
  return (
    <div className="mainlist-header">
      <span>{name}</span>
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
    </div>
  );
}


Header.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};


export default Header;
