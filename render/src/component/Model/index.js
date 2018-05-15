
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Checkbox, Timeline } from 'antd';

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
    ['bi4', BI4, BI4Active],
    ['vtk', VTK, VTKActive],
    ['out', OUT, OUTActive],
    ['csv', CSV, CSVActive],
    ['rsm', RSM, RSMActive]
  ];
  render() {
    const { store } = this.props;
    const path = store.filePath || store.xmlPath;

    return (
      <div className={`model ${store.view === 'model' ? 'active' : ''}`}>
        <div className="model-options">
          <div onClick={store.toggleView.bind(store, 'args')}>
            <Icon type="edit" />
            <span>编辑参数</span>
          </div>
          <div onClick={store.selectXML}>
            <Icon type="folder-open" />
            <span>载入XML</span>
          </div>
          <div>
            <Icon type="question-circle-o" />
            <span>帮助</span>
          </div>
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
              <Checkbox
                onChange={store.selectFileType.bind(store, f[0])}
                checked={store.selectedFileTypes.includes(f[0])}
              >{f[0].toUpperCase()}</Checkbox>
            </div>
          </div>
        </div>
        <div className="model-process">
          <p className="title">模型生成</p>
          <Button
            if={!store.execing}
            disabled={!path}
            onClick={store.exec}
            icon="caret-right"
            shape="circle"
          />
          <Button
            else
            icon="close"
            type="danger"
            shape="circle"
            onClick={store.stopExec}
          />

          <p if={path}>算例路径: {path}</p>
          <span else>算例未加载</span>
          <Timeline
            if={store.step}
            pending={store.step[0] ?
              store.step[0].split('\n')
                .map((item, key) => <div key={key}>{item}</div>) :
              null
            }
          >
            <Timeline.Item
              for={(t, index) in store.step[1]}
              color="green"
              key={index}
            >{t}</Timeline.Item>
          </Timeline>
        </div>
      </div>
    );
  }
}


export default Model;
