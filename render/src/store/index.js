
import React from 'react';
import { observable, action, computed } from 'mobx';

import { hoc } from '../utils';



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


}


const store = new Store();
const withStore = (Component) => {
  return hoc.inject(Component, { store });
};


export {
  store,
  withStore
};
