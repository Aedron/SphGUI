
import React from 'react';
import { observable, action, computed } from 'mobx';

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
  // Add
  onAddLine = () => {
    const line = {
      type: typesMap.LINE,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL
    };
    this.mainList.push(line);
  };
  // Handler
  onDeleteObject = (index) => {
    this.mainList.splice(index, 1);
  };
  onChangeType = (index, e) => {
    this.mainList[index].isFluid = e.target.value === 'fluid';
  };
  onChangeDrawMode = (index, e) => {
    this.mainList[index].drawMode = e.target.value;
  };
  onChangeShapeMode = (index, checkedValues) => {
    if (checkedValues.length === 0) checkedValues = [shapeModeMap.REAL];
    this.mainList[index].shapeMode = checkedValues;
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
