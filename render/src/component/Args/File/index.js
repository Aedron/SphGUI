
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Input } from 'antd';
import Header from '../Common/Header';
import Transform from '../Common/Transform';
import Point from '../Point';
import { withStore } from '../../../store';

import "./index.scss";



@withStore
@observer
class File extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  render() {
    const { props: { store, index } } = this;
    const data = store.mainList[index];

    return (
      <div className="line mainlist-item">
        <Header
          index={index}
          store={store}
          name={`${data.fileType.toUpperCase()} (外部模型文件)`}
          operator={() => {}}
        />
        <div className="mainlist-args">
          <div className="mainlist-arg-item" style={{ display: 'block' }}>
            <span className="args-item-name">路径: </span>
            <span>{data.path}</span>
          </div>
          <Transform store={store} index={index} />
        </div>
      </div>
    );
  }
}


export default File;
