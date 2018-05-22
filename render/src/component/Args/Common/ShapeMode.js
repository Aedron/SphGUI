
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Checkbox, Popover } from 'antd';

import { data } from '../../../utils';


const { shapeModes } = data;
const { Group: CheckboxGroup } = Checkbox;


function ShapeMode(props) {
  const { store, index } = props;
  const data = store.mainList[index];

  return (
    <div className="mainlist-arg-item">
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>定义创建VTK文件的绘制操作</p>
          </div>
        )}
        title="DrawMode"
      >
        <span className="args-item-name">ShapeMode:</span>
      </Popover>
      <CheckboxGroup
        options={shapeModes.map(i => ({ label: i, value: i }))}
        onChange={store.onChangeShapeMode.bind(store, index)}
        value={toJS(data.shapeMode)}
      />
    </div>
  )
}

ShapeMode.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(ShapeMode);
