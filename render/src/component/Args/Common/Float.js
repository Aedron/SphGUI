import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';
import {Button, Radio, Popconfirm, InputNumber} from 'antd';

import Point from '../Point';

const {Group: RadioGroup} = Radio;
const {Group: ButtonGroup} = Button;


function Float(props) {
  const {store, index} = props;
  const {float} = store.mainList[index];
  const {
    rhopbody,
    relativeweight,
    massbody,
    center,
    inertia,
    velini,
    omegaini
  } = float || {};
  const floatData = [
    [rhopbody, 'rhopbody'],
    [relativeweight, '相对质量', 'relativeweight'],
    [massbody, 'massbody'],
    [center, 'center'],
    [inertia, 'inertia'],
    [velini, 'velini'],
    [omegaini, 'omegaini']
  ];

  return (
    <div if={float} className="line-points mainlist-item">
      <div className="mainlist-header">
        <span>漂浮物设置</span>
        <div>
          <ButtonGroup>
            {floatData.map(([f, text, subText], i) => [
              <Popconfirm
                if={f || f === 0}
                key={`${i}-0`}
                title={`确定删除${text}属性?`}
                onConfirm={store.onToggleFloatAttr.bind(store, index, subText || text)}
                okText="确认"
                cancelText="取消"
              >
                <Button type="primary">{text}</Button>
              </Popconfirm>,
              <Button
                if={!(f || f === 0)}
                key={`${i}-1`}
                onClick={store.onToggleFloatAttr.bind(store, index, subText || text)}
              >{text}</Button>
            ])}
          </ButtonGroup>
        </div>
      </div>
      <div className="mainlist-args">
        <div
          for={(f, i) in floatData.filter(([i]) => i || i === 0)}
          key={i}
          className="mainlist-arg-item point-item"
        >
          <span>{f[1]}: </span>
          <Point
            if={Array.isArray(toJS(f[0]))}
            point={toJS(f[0])}
            onChange={store.onChangeFloatAttrArray.bind(store, index, f[2] || f[1])}
          />
          <InputNumber
            else
            value={f[0]}
            onChange={store.onChangeFloatAttrNumber.bind(store, index, f[2] || f[1])}
          />
        </div>
      </div>
    </div>
  );
}

Float.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};


export default observer(Float);
