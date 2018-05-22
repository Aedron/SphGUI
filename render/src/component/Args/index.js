import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {Button, Collapse, Input, InputNumber, Popover, Radio, Switch, Tag, Tooltip} from 'antd';

import Line from './Line';
import Triangle from './Triangle';
import Pyramid from './Pyramid';
import Prism from './Prism';
import Box from './Box';
import Sphere from './Sphere';
import Cylinder from './Cylinder';
import Beach from './Beach';
import File from './File';
import Fill from './Fill';
import Point from './Point'

import {importFile, genConDocs, genParamsDocs} from './utils';
import {data} from '../../utils';
import {withStore} from '../../store';

import Container0 from '../../static/docPics/container0.png';
import Container1 from '../../static/docPics/container1.png';
import "./index.scss";


const {typesMap} = data;
const {Panel} = Collapse;
const {Group: ButtonGroup} = Button;
const {Button: RadioButton, Group: RadioGroup} = Radio;
const {CheckableTag} = Tag;


@withStore
@observer
class Args extends Component {
  state = {
    showAdd: true
  };
  componentDidMount = () => {
    // this.onAdd('box');
  };
  onOk = () => {
    this.props.store.toggleView('model');
    this.props.store.genXML();
  };
  // mainlist
  onAdd = (type) => {
    const {props: {store}} = this;
    this.onToggleShowAdd();
    switch (type) {
      case 'file':
        return this.onAddFile();
      case 'line':
        return store.onAddLine();
      case 'triangle':
        return store.onAddTriangle();
      case 'pyramid':
        return store.onAddPyramid();
      case 'prism':
        return store.onAddPrism();
      case 'box':
        return store.onAddBox();
      case 'sphere':
        return store.onAddSphere();
      case 'cylinder':
        return store.onAddCylinder();
      case 'beach':
        return store.onAddBeach();
      case 'fill':
        return store.onAddFill();
    }
  };
  onToggleShowAdd = () => this.setState({showAdd: !this.state.showAdd});
  onAddFile = async () => {
    const {props: {store}} = this;
    const files = await importFile();
    if (!files) return;
    files.forEach((path) => {
      const type = path.split('.').pop();
      store.onAddFile(path, type);
    });
  };

  // params
  genOnParamsChange = (i) => {
    return (e) => {
      const {params} = this.state;
      params[i].value = typeof e === 'object' ? e.target.value : e;
      return this.setState({params})
    };
  };
  genOnParamsCheck = (i) => {
    return (checked) => {
      const {params} = this;
      params[i].disable = !checked;
      return this.setState({params})
    };
  };

  // render
  renderMainList = (o, index) => {
    const {type} = o;
    let Component;
    switch (type) {
      case typesMap.LINE:
        Component = Line;
        break;
      case typesMap.TRIANGLES:
        Component = Triangle;
        break;
      case typesMap.QUADRI:
        Component = Triangle;
        break;
      case typesMap.STRIP:
        Component = Triangle;
        break;
      case typesMap.PYRAMID:
        Component = Pyramid;
        break;
      case typesMap.PRISM:
        Component = Prism;
        break;
      case typesMap.BOX:
        Component = Box;
        break;
      case typesMap.SPHERE:
        Component = Sphere;
        break;
      case typesMap.CYLINDER:
        Component = Cylinder;
        break;
      case typesMap.BEACH:
        Component = Beach;
        break;
      case 'file':
        Component = File;
        break;
      case 'fill':
        Component = Fill;
        break;
      default:
        return;
    }
    return <Component key={index} index={index}/>
  };
  renderParams = (p, i) => {
    const {props: {store}} = this;
    const {name, displayName, value, disable, unit, options} = p;
    const onChange = store.onChangeParams.bind(store, i);
    const onChecked = store.onCheckParams.bind(store, i);
    const Component = typeof value === 'number' ? InputNumber : Input;
    const inputStyle = {
      width: '180px'
    };
    return (
      <div
        className="args-item"
        key={i}
      >
        <Switch checked={!disable} onChange={onChecked} size="small"/>
        {genParamsDocs(p)}
        <RadioGroup
          if={options}
          value={value}
          onChange={onChange}
          disabled={disable}
          className="args-item-value"
        >
          <Radio
            for={k in Object.keys(options).map(i => parseInt(i))}
            value={k}
            key={k}
          >{options[k]}</Radio>
        </RadioGroup>
        <Component
          else
          value={value}
          onChange={onChange}
          disabled={disable}
          className="args-item-value"
          style={inputStyle}
        />
        <span if={unit} className="args-unit">({unit})</span>
      </div>
    )
  };

  render() {
    const {state, props: {store}} = this;

    return (
      <div className={`args ${store.view === 'args' ? 'active' : ''}`}>
        <Collapse
          bordered={false}
          defaultActiveKey={['mainlist']}
        >
          {/*container*/}
          <Panel
            header={
              <Popover
                mouseEnterDelay={0.5}
                content={(
                  <div className="doc">
                    <div>
                      <p>通过两个点创建一个立方体, 确定粒子能够被创建的区域</p>
                      <img src={Container0}/>
                    </div>
                    <div>
                      <p>将两个顶点的Y值都设为一样时可以创建出2D模型</p>
                      <img src={Container1}/>
                    </div>
                  </div>
                )}
                title="容器设置"
              >
                geometry.defintion (容器设置)
              </Popover>
            }
            key="defintion"
          >
            <div className="defintion-item args-item">
              <span className="args-item-name">dp:</span>
              <Tooltip
                title="粒子间距"
                trigger={['focus']}
              >
                <InputNumber
                  className="args-item-value"
                  value={store.container.dp}
                  onChange={store.onChangeContainerDp.bind(store)}
                />
              </Tooltip>
            </div>
            <div className="defintion-item args-item">
              <span className="args-item-name">min:</span>
              <div className="args-item-values">
                <Point
                  point={toJS(store.container.min)}
                  onChange={store.onChangeContainer.bind(store, false)}
                />
              </div>
            </div>
            <div className="defintion-item args-item">
              <span className="args-item-name">max:</span>
              <div className="args-item-values">
                <Point
                  point={toJS(store.container.max)}
                  onChange={store.onChangeContainer.bind(store, true)}
                />
              </div>
            </div>
          </Panel>
          {/*mainlist*/}
          <Panel
            className="mainlist"
            header="geometry.commands.mainlist (物件设置)"
            key="mainlist"
          >
            {store.mainList.map(this.renderMainList)}
            <ButtonGroup if={state.showAdd}>
              <Button
                type="danger"
                icon="close"
                onClick={this.onToggleShowAdd}
              >取消</Button>
              <Button icon="folder-open" onClick={() => this.onAdd('file')}>导入</Button>
              <Button onClick={() => this.onAdd('line')}>线</Button>
              <Button onClick={() => this.onAdd('triangle')}>三角</Button>
              <Button onClick={() => this.onAdd('pyramid')}>棱锥</Button>
              <Button onClick={() => this.onAdd('prism')}>棱柱</Button>
              <Button onClick={() => this.onAdd('box')}>立方体</Button>
              <Button onClick={() => this.onAdd('sphere')}>球</Button>
              <Button onClick={() => this.onAdd('cylinder')}>圆柱</Button>
              <Button onClick={() => this.onAdd('beach')}>Beach</Button>
              <Button onClick={() => this.onAdd('fill')}>填充</Button>
            </ButtonGroup>
            <Button
              else
              icon="plus"
              onClick={this.onToggleShowAdd}
            >添加物件</Button>
          </Panel>
          {/*constant*/}
          <Panel
            header="constantsdef (环境常量)"
            key="constants"
          >
            <div
              for={(arg, i) in store.constants}
              key={arg.name}
              className={"args-item"}
            >
              {genConDocs(arg)}
              <div
                if={Array.isArray(toJS(arg.value))}
                className="args-item-values"
              >
                <div
                  if={arg.displayOptions || arg.options}
                  for={(v, j) in arg.value}
                  key={arg.options[j]}
                >
                  <span>{(arg.displayOptions || arg.options)[j]}</span>
                  <InputNumber
                    value={v}
                    onChange={store.onChangeCon.bind(store, i, j)}
                  />
                </div>
                <Point
                  else
                  point={toJS(arg.value)}
                  onChange={store.onChangeCon.bind(store, i)}
                />
              </div>
              <InputNumber
                else
                className="args-item-value"
                value={arg.value}
                onChange={store.onChangeCon.bind(store, i, null)}
              />
              <span
                className="args-unit"
                if={arg.unit}
              >({arg.unit})</span>
            </div>
          </Panel>
          {/*params*/}
          <Panel
            className="params"
            header="execution.parameters (执行参数)"
            key="params"
          >
            {store.params.map(this.renderParams)}
          </Panel>
          {/*bundle*/}
          <Panel
            header="mkconfig (bundle配置)"
            key="mkconfig"
          >
            <div className="mkconfig-item args-item">
              <span className="args-item-name">boundcount:</span>
              <InputNumber
                className="args-item-value"
                value={store.mkConfig.boundCount}
                onChange={store.onChangeBoundCount.bind(store)}
              />
            </div>
            <div className="mkconfig-item args-item">
              <span className="args-item-name">fluidCount:</span>
              <InputNumber
                className="args-item-value"
                value={store.mkConfig.fluidCount}
                onChange={store.onChangeFluidCount.bind(store)}
              />
            </div>
          </Panel>
        </Collapse>
        <Button
          type="primary"
          icon="check"
          onClick={this.onOk}
        >生成算例</Button>
      </div>
    );
  }
}


export default Args;
