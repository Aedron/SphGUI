
import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Tooltip, Button } from 'antd';

import './index.scss';



function Point(props) {
  const {
    point, onChange, comment,
    showDelete, onDelete, style
  } = props;
  return [
    <div className="point" key="0" style={style}>
      <Tooltip
        for={(p, i) in point}
        title={`${comment[i]}: ${p}`}
        trigger={['focus']}
        key={i}
      >
        <InputNumber
          value={p}
          onChange={v => onChange(i, v || 0)}
          style={{ width: `${100 / point.length}%` }}
        />
      </Tooltip>
    </div>,
    <Button
      key="1"
      type="danger"
      shape="circle"
      icon="close"
      size="small"
      onClick={showDelete ? onDelete : () => {}}
      style={ showDelete ?
        { opacity: 1, cursor: 'pointer' } : { opacity: 0, cursor: 'default' }
      }
    />
  ];
}

Point.propTypes = {
  point: PropTypes.array.isRequired,
  comment: PropTypes.array,
  showDelete: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  style: PropTypes.object
};
Point.defaultProps = {
  comment: ['X', 'Y', 'Z'],
  showDelete: false,
  onDelete: () => {},
  style: {}
};


export default Point;
