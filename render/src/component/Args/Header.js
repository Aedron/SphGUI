
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';



function Header(props) {
  const { index, store, name } = props;
  return (
    <div className="mainlist-header">
      <span>{name}</span>
      <Button
        type="danger"
        icon="delete"
        onClick={store.onDeleteObject.bind(store, index)}
      >删除</Button>
    </div>
  );
}


Header.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};


export default Header;
