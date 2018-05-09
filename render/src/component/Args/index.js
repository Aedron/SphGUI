
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Collapse, Radio, Tag, InputNumber,
  Button
} from 'antd';

import Line from './Line';
import Triangle from './Triangle';
import Pyramid from './Pyramid';
import Prism from './Prism';
import Box from './Box';

import { loadTemplate, genXML } from './utils';
import { data } from '../../utils';
import { withStore } from '../../store';

import "./index.scss";


const { remote } = window.require('electron');
const { typesMap } = data;
const { Panel } = Collapse;
const { Group: ButtonGroup } = Button;
const { Button: RadioButton } = Radio;
const { Group: RadioGroup } = Radio;
const { CheckableTag } = Tag;



@withStore
@observer
class Args extends Component {
  state = {
    constants: loadTemplate('constants'),
    mkConfig: {
      boundCount: 240,
      fluidCount: 10
    },
    container: {
      dp: 0.005,
      min: [0, 0, 0],
      max: [2, 2, 2]
    },
    showAdd: true
  };

  genOnConChange = (i, j) => {
    const { state: { constants } } = this;
    return (e) => {
      const value = typeof e === 'object' ? e.target.value : e;
      if (j || j === 0) {
        constants[i].value[j][1] = value;
      } else {
        constants[i].value = value;
      }
      this.setState({ constants });
    }
  };
  onChangeBoundCount = (value) => {
    const { mkConfig } = this.state;
    this.setState({ mkConfig: { ...mkConfig, boundCount: value }});
  };
  onChangeFluidCount = (value) => {
    const { mkConfig } = this.state;
    this.setState({ mkConfig: { ...mkConfig, fluidCount: value }});
  };
  onChangeContainerDp = (value) => {
    const { container } = this.state;
    this.setState({ container: { ...container, dp: value } });
  };
  genOnChangeContainer = (i, isMax) => {
    return (value) => {
      const { container } = this.state;
      let { min, max } = container;
      (isMax ? max : min)[i] = value;
      this.setState({ container: {
        ...container,
          min: [...min],
          max: [...max]
      }});
    };
  };

  // mainlist
  onToggleShowAdd = () => this.setState({ showAdd: !this.state.showAdd });
  renderMainList = (o, index) => {
    const { type } = o;
    let Component;
    switch (type) {
      case typesMap.LINE: Component = Line; break;
      case typesMap.TRIANGLES: Component = Triangle; break;
      case typesMap.QUADRI: Component = Triangle; break;
      case typesMap.STRIP: Component = Triangle; break;
      case typesMap.PYRAMID: Component = Pyramid; break;
      case typesMap.PRISM: Component = Prism; break;
      case typesMap.BOX: Component = Box; break;
    }
    return <Component key={index} index={index} />
  };

  render() {
    const { state, props: { store } } = this;

    return (
      <div className={`args ${store.view === 'args' ? 'active' : ''}`}>
        <RadioGroup
          value={store.argsType}
          onChange={store.changeArgsType}
        >
          <RadioButton value="2d">2D模型</RadioButton>
          <RadioButton value="3d">3D模型</RadioButton>
          <RadioButton value="xml">自定义</RadioButton>
        </RadioGroup>
        <Collapse
          bordered={false}
          defaultActiveKey={['mainlist']}
        >
          <Panel
            header="constantsdef (环境常量)"
            key="constants"
          >
            <div
              for={(arg, i) in state.constants}
              key={arg.name}
              className={"args-item"}
            >
              <p className="args-item-name">{arg.displayName || arg.name}:</p>
              <div
                if={Array.isArray(arg.value)}
                className="args-item-values"
              >
                <div
                  for={(subArg, j) in arg.value}
                  key={subArg[0]}
                >
                  <span>{subArg[0]}</span>
                  <InputNumber
                    value={subArg[1]}
                    onChange={this.genOnConChange(i, j)}
                  />
                </div>
              </div>
              <InputNumber
                else
                className="args-item-value"
                value={arg.value}
                onChange={this.genOnConChange(i)}
              />
              <span
                className="args-unit"
                if={arg.unit}
              >({arg.unit})</span>
            </div>
          </Panel>
          <Panel
            header="mkconfig (bundle配置)"
            key="mkconfig"
          >
            <div className="mkconfig-item args-item">
              <span className="args-item-name">boundcount:</span>
              <InputNumber
                className="args-item-value"
                value={state.mkConfig.boundCount}
                onChange={this.onChangeBoundCount}
              />
            </div>
            <div className="mkconfig-item args-item">
              <span className="args-item-name">fluidCount:</span>
              <InputNumber
                className="args-item-value"
                value={state.mkConfig.fluidCount}
                onChange={this.onChangeFluidCount}
              />
            </div>
          </Panel>
          <Panel
            header="geometry.defintion (容器设置)"
            key="defintion"
          >
            <div className="defintion-item args-item">
              <span className="args-item-name">dp:</span>
              <InputNumber
                className="args-item-value"
                value={state.container.dp}
                onChange={this.onChangeContainerDp}
              />
            </div>
            <div className="defintion-item args-item">
              <span className="args-item-name">min:</span>
              <div className="args-item-values">
                <div>
                  <span>X</span>
                  <InputNumber
                    value={state.container.min[0]}
                    onChange={this.genOnChangeContainer(0)}
                  />
                </div>
                <div>
                  <span>Y</span>
                  <InputNumber
                    value={state.container.min[1]}
                    onChange={this.genOnChangeContainer(1)}
                  />
                </div>
                <div>
                  <span>Z</span>
                  <InputNumber
                    value={state.container.min[2]}
                    onChange={this.genOnChangeContainer(2)}
                  />
                </div>
              </div>
            </div>
            <div className="defintion-item args-item">
              <span className="args-item-name">max:</span>
              <div className="args-item-values">
                <div>
                  <span>X</span>
                  <InputNumber
                    value={state.container.max[0]}
                    onChange={this.genOnChangeContainer(0, true)}
                  />
                </div>
                <div>
                  <span>Y</span>
                  <InputNumber
                    value={state.container.max[1]}
                    onChange={this.genOnChangeContainer(1, true)}
                  />
                </div>
                <div>
                  <span>Z</span>
                  <InputNumber
                    value={state.container.max[2]}
                    onChange={this.genOnChangeContainer(2, true)}
                  />
                </div>
              </div>
            </div>
          </Panel>
          <Panel
            className="mainlist"
            header="geometry.commands.mainlist (物件设置)"
            key="mainlist"
          >
            { store.mainList.map(this.renderMainList) }
            <ButtonGroup if={state.showAdd}>
              <Button
                type="danger"
                icon="close"
                onClick={this.onToggleShowAdd}
              >取消</Button>
              <Button icon="folder-open">导入</Button>
              <Button onClick={store.onAddLine}>线</Button>
              <Button onClick={store.onAddTriangle}>三角</Button>
              <Button onClick={store.onAddPyramid}>棱锥</Button>
              <Button onClick={store.onAddPrism}>棱柱</Button>
              <Button onClick={store.onAddBox}>立方体</Button>
              <Button>球</Button>
              <Button>圆柱</Button>
              <Button>Beach</Button>
            </ButtonGroup>
            <Button
              else
              icon="plus"
              onClick={this.onToggleShowAdd}
            >添加物件</Button>
          </Panel>
        </Collapse>
      </div>
    );
  }
}


export default Args;
