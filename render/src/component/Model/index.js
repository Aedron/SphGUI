
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';

import { withStore } from '../../store';

import "./index.scss";

import XML from '../../static/pics/xml0.svg';
import XMLActive from '../../static/pics/xml1.svg';
import OUT from '../../static/pics/out0.svg';
import OUTActive from '../../static/pics/out1.svg';
import VTK from '../../static/pics/vtk0.svg';
import VTKActive from '../../static/pics/vtk1.svg';
import BI4 from '../../static/pics/bi40.svg';
import BI4Active from '../../static/pics/bi41.svg';
import CSV from '../../static/pics/csv0.svg';
import CSVActive from '../../static/pics/csv1.svg';
import RSM from '../../static/pics/rsm0.svg';
import RSMActive from '../../static/pics/rsm1.svg';




@withStore
@observer
class Model extends Component {
  fileTypes = [
    ['xml', XML, XMLActive],
    ['out', OUT, OUTActive],
    ['vtk', VTK, VTKActive],
    ['bi4', BI4, BI4Active],
    ['csv', CSV, CSVActive],
    ['rsm', RSM, RSMActive]
  ];
  render() {
    const { store } = this.props;

    return (
      <div className={`model ${store.view === 'model' ? 'active' : ''}`}>
        <div className="model-args">
          <p className="title">参数</p>
          <Button icon="folder-open">载入XML</Button>
          <Button
            icon="form"
            onClick={store.toggleView.bind(store, 'args')}
          >编辑参数</Button>
        </div>
        <div className="model-trans">
          <p className="title">目标格式</p>
          <div className="model-file-type">
            <div
              for={f in this.fileTypes}
              onClick={store.selectFileType.bind(store, f[0])}
              key={f[0]}
            >
              <img src={f[store.selectedFileTypes.includes(f[0]) ? 2 : 1]}/>
            </div>
          </div>
        </div>
        <div className="model-process">
          <p className="title">模型生成</p>
        </div>
      </div>
    );
  }
}


export default Model;
