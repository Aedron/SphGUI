
import React from 'react';
import { observable, action, computed } from 'mobx';
import { message } from 'antd';

import { hoc, data } from '../utils';


const { shapeModeMap, typesMap, drawModeMap } = data;


class Store {
  @observable viewIndex = 1;
  @computed get view() {
    return this.views[this.viewIndex];
  }
  @action toggleView = (view) => {
    if (typeof view === 'number') this.viewIndex = view;
    else {
      const index = this.views.indexOf(view);
      if (index >= 0) this.viewIndex = index;
    }
  };
  views = ['model', 'args', 'trans', 'conf', 'about'];

  @observable selectedFileTypes = ['xml', 'out', 'vtk'];
  @action selectFileType = (type) => {
    const index = this.selectedFileTypes.indexOf(type);
    if (index >= 0) this.selectedFileTypes.splice(index, 1);
    else this.selectedFileTypes.push(type);
  };

  @observable argsType = '2d';
  @action changeArgsType = (e) => {
    this.argsType = e.target.value;
  };

  /*
  *** 主要的物件 mainlist
   */
  @observable
  mainList = [];
  // Line
  onAddLine = () => {
    const line = {
      type: typesMap.LINE,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      points: [[0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(line);
  };
  onAddLinePoint = (index) => {
    this.mainList[index].points.push([0, 0, 0]);
  };
  onDeleteLinePoint = (index, i) => {
    const { points } = this.mainList[index];
    if (points.length <= 2) {
      return message.warning('至少包含两个点');
    }
    points.splice(i, 1);
  };
  onChangeLinePoint = (index, i, j, v) => {
    this.mainList[index].points[i][j] = v;
  };
  // 删除物件
  onDeleteObject = (index) => {
    this.mainList.splice(index, 1);
  };
  // 更改物件类型 流体/边界
  onChangeType = (index, e) => {
    this.mainList[index].isFluid = e.target.value === 'fluid';
  };
  // 更改DrawMode 线/面/内部/实体
  onChangeDrawMode = (index, e) => {
    this.mainList[index].drawMode = e.target.value;
  };
  // 更改ShapeMode real/dp/fluid...
  onChangeShapeMode = (index, checkedValues) => {
    if (checkedValues.length === 0) checkedValues = [shapeModeMap.REAL];
    this.mainList[index].shapeMode = checkedValues;
  };
  // 更改变换 移动属性
  onToggleTransformMove = (index) => {
    const { transform } = this.mainList[index];
    transform.move = transform.move ?
      null : [0, 0, 0];
  };
  onChangeTransformMove = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.move[i] = value;
  };
  // 更改变换 缩放属性
  onToggleTransformScale = (index) => {
    const { transform } = this.mainList[index];
    transform.scale = transform.scale ?
      null : [0, 0, 0];
  };
  onChangeTransformScale = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.scale[i] = value;
  };
  // 更改变换 旋转属性
  onToggleTransformRotate = (index) => {
    const { transform } = this.mainList[index];
    transform.rotate = transform.rotate ?
      null : [0, 0, 0, 0];
  };
  onChangeTransformRotate = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.rotate[i] = value;
  }
}


const store = new Store();
const withStore = (Component) => {
  return hoc.inject(Component, { store });
};


export {
  store,
  withStore
};
