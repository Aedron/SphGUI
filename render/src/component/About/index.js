
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";

const { remote, shell } = window.require('electron');
const remoteRequire = remote.require;
const { dialog } = remoteRequire('electron');
const fs = remoteRequire('fs-extra');
const path = remoteRequire('path');
const { app } = remoteRequire('./index.js');



@withStore
@observer
class About extends Component {
  open = (url) => {
    shell.openExternal(url);
  };
  saveDoc = (type) => {
    const savePath = dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ['openDirectory']
    });
    if (!savePath) return;

    let name;
    switch (type) {
      case 'XML_GUIDE': name = 'XML_v4.0_GUIDE.pdf'; break;
      case 'SPH': name = 'DualSPHysics_v4.0_GUIDE.pdf'; break;
      case 'EXT': name = 'ExternalModelsConversion.pdf'; break;
      case 'POST': name = 'PostprocessingCalculations_v4.pdf'; break;
      default: return;
    }
    const from = path.join(app.getAppPath(), `./doc/${name}`);
    const to = path.join(savePath[0], name);
    fs.copy(from, to, (e) => {
      if (e) {
        return dialog.showErrorBox('出错', e.toString());
      }
      dialog.showMessageBox({
        type: 'info',
        title: '完成',
        message: `已保存至${to}`
      });
    })
  };

  render() {
    const { store } = this.props;

    return (
      <div className={`about ${store.view === 'about' ? 'active' : ''}`}>
        <div>
          <h1>关于</h1>
          <p>核心程序仓库: <a onClick={this.open.bind(this, 'https://github.com/HuQingyang/DualSPHysics')}>DualSPH</a> </p>
          <p>GUI仓库: <a onClick={this.open.bind(this, 'https://github.com/HuQingyang/SphGUI')}>SphGUI</a></p>
          <p>官网: <a onClick={this.open.bind(this, 'http://dual.sphysics.org/')}>DualSPHysics</a></p>
        </div>
        <div>
          <h1>文档</h1>
          <p>XML指引: <a onClick={this.saveDoc.bind(this, 'XML_GUIDE')}>点击下载</a> </p>
          <p>SPH指引: <a onClick={this.saveDoc.bind(this, 'SPH')}>点击下载</a> </p>
          <p>外部模型指引: <a onClick={this.saveDoc.bind(this, 'EXT')}>点击下载</a> </p>
          <p>预处理说明: <a onClick={this.saveDoc.bind(this, 'POST')}>点击下载</a> </p>
        </div>
      </div>
    );
  }
}


export default About;
