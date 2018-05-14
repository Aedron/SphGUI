
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import AceEditor from 'react-ace';

import { withStore } from '../../store';

import 'brace/mode/xml';
import 'brace/theme/tomorrow'
import "./index.scss";



@withStore
@observer
class Editor extends Component {
  options = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
  };
  onExec = () => {
    const { store } = this.props;
    store.savePath = null;
    store.genXML(store.xmlContent);
    store.toggleView('model');
  };

  render() {
    const { store } = this.props;

    return (
      <div className={`editor ${store.view === 'editor' ? 'active' : ''}`}>
        <AceEditor
          if={store.xmlContent !== null}
          mode="xml"
          theme="tomorrow"
          name="blah2"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={store.xmlContent}
          onChange={store.onChangeXML}
          setOptions={this.options}
          width="100%"
          height="calc(100% - 34px)"
        />
        <div className="editor-bar">
          <div className={store.isFileChanged ? 'changed' : 'unchanged'}>
            <span>{store.isFileChanged ? '更改未保存' : '已保存'}: </span>
            <span>{store.xmlPath}</span>
          </div>
          <div className="btns">
            <div className="btn" onClick={store.onSaveXML}>
              <Icon type="save" />
              <span>保存</span>
            </div>
            <div className="btn" onClick={this.onExec}>
              <Icon type="caret-right"/>
              <span>运行</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Editor;
