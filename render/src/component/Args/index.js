
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Collapse, Radio, Tag, InputNumber } from 'antd';

import { loadTemplate, genXML } from './utils';
import { withStore } from '../../store';

import "./index.scss";


const { remote } = window.require('electron');
const Panel = Collapse.Panel;
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
    // 主要的物件 mainlist
    shapeMode: [
      ['real', false],
      ['dp', true],
      ['fluid', false],
      ['bound', true],
      ['void', false]
    ],
    drawMode: [
      ['wire(线)', false],
      ['face(面)', false],
      ['solid(实体)', false],
      ['full(面+实体)', true]
    ],
    // 流体
    mkFluid: 0,

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
  genOnShapeModeChange = (i) => {
    return () => {
      const { shapeMode } = this.state;
      shapeMode[i][1] = !shapeMode[i][1];
      return this.setState({ shapeMode: [...shapeMode] });
    };
  };
  genOnDrawModeChange = (i) => {
    return () => {
      const { drawMode } = this.state;
      drawMode.forEach((d, index) => {
        d[1] = index === i;
      });
      return this.setState({ drawMode });
    };
  };

  render() {
    const { state, props: { store } } = this;
    console.log(genXML(state));

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
        <Collapse bordered={false}>
          <Panel header="constantsdef (环境常量)">
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
          <Panel header="mkconfig (bundle配置)">
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
          <Panel header="geometry.defintion (容器设置)">
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
          <Panel header="geometry.commands.mainlist (物件设置)">
            <div className="mainlist-item args-item shapemode">
              <span className="args-item-name">shapemode:</span>
              <CheckableTag
                for={(m, i) in state.shapeMode}
                key={m[0]}
                checked={m[1]}
                onChange={this.genOnShapeModeChange(i)}
              >{m[0]}</CheckableTag>
            </div>
            <div className="mainlist-item args-item drawmode">
              <span className="args-item-name">drawmode:</span>
              <CheckableTag
                for={(m, i) in state.drawMode}
                key={m[0]}
                checked={m[1]}
                onChange={this.genOnDrawModeChange(i)}
              >{m[0]}</CheckableTag>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}


export default Args;
