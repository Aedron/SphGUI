
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withStore } from '../../store';

import "./index.scss";

import Model from '../../static/pics/模型0.svg';
import ModelActive from '../../static/pics/模型1.svg';
import Editor from '../../static/pics/参数0.svg';
import EditorActive from '../../static/pics/参数1.svg';
import Trans from '../../static/pics/格式0.svg';
import TransActive from '../../static/pics/格式1.svg';
import Conf from '../../static/pics/首选项0.svg';
import ConfActive from '../../static/pics/首选项1.svg';
import About from '../../static/pics/关于0.svg';
import AboutActive from '../../static/pics/关于1.svg';




@withStore
@observer
class Nav extends Component {
  items = [
    ["模型生成", Model, ModelActive, 'model'],
    ["算例生成", Trans, TransActive, 'args'],
    ["XML编辑", Editor, EditorActive, 'editor'],
    ["首选项", Conf, ConfActive, 'conf'],
    ["关于信息", About, AboutActive, 'about']
  ];
  render() {
    const { store } = this.props;

    return (
      <div className="nav">
        <div className="nav-container">
          <div
            for={(i, index) in this.items}
            key={i[3]}
            className={`nav-item ${store.view === i[3] ? 'active' : ''}`}
            onClick={store.toggleView.bind(store, index)}
          >
            <img src={i[store.view === i[3] ? 2 : 1]} />
            <span>{i[0]}</span>
          </div>
        </div>
      </div>
    );
  }
}


export default Nav;
