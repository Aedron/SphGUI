
import React from 'react';
import { observable, action, computed } from 'mobx';
import { message } from 'antd';

import { loadTemplate, genXML } from './utils';
import { hoc, data } from '../utils';


const {
  shapeModeMap, typesMap, drawModeMap,
  boxFillMap, boxFills, fillTypeMap,
  fillModeMap, defaultFloatAttrMap
} = data;


class Store {
  /*
  *** view
   */
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
  views = ['model', 'args', 'editor', 'conf', 'about'];

  /*
  *** FileType
   */
  @observable selectedFileTypes = ['xml', 'out', 'vtk'];
  @action selectFileType = (type) => {
    const index = this.selectedFileTypes.indexOf(type);
    if (index >= 0) this.selectedFileTypes.splice(index, 1);
    else this.selectedFileTypes.push(type);
  };

  /*
  *** Args
   */
  // 环境常量
  @observable constants = loadTemplate('constants');
  @action onChangeCon = (i, j, e) => {
    const value = typeof e === 'object' ? e.target.value : e;
    if (j || j === 0) {
      this.constants[i].value[j][1] = value || 0;
    } else {
      this.constants[i].value = value || 0;
    }
  };
  // 执行参数
  @observable params = loadTemplate('params');
  // Bundle 配置
  @observable mkConfig = {
    boundCount: 240,
    fluidCount: 10
  };
  @action onChangeBoundCount = (value) => {
    this.mkConfig.boundCount = value || 0;
  };
  @action onChangeFluidCount = (value) => {
    this.mkConfig.fluidCount = value || 0;
  };
  // 容器
  @observable container = {
    dp: 0.005,
    min: [0, 0, 0],
    max: [2, 2, 2]
  };
  @observable onChangeContainerDp = (value) => {
    this.container.dp = value || 0;
  };
  @observable onChangeContainer = (i, isMax, value) => {
    const { container } = this;
    let { min, max } = container;
    (isMax ? max : min)[i] = value || 0;
  };

  /*
  *** 主要的物件 mainlist
   */
  @observable mainList = [];
  // Line
  @action onAddLine = () => {
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
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(line);
  };
  // Triangle
  @action onAddTriangle = () => {
    const triangle = {
      type: typesMap.TRIANGLES,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(triangle);
  };
  @action onChangeTriangleType = (index, e) => {
    const { value } = e.target;
    const data = this.mainList[index];
    if (value === data.type) return;

    const [a, b, c, d] = data.points;
    if (value === typesMap.TRIANGLES) {
      data.points = [a, b, c];
    } else {
      data.points = [a, b, c, d || [0, 0, 0]];
    }
    data.type = value;
  };
  // Pyramid
  @action onAddPyramid = () => {
    const pyramid = {
      type: typesMap.PYRAMID,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(pyramid);
  };
  // Prism
  @action onAddPrism = () => {
    const prism = {
      type: typesMap.PRISM,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(prism);
  };
  // Box
  @action onAddBox = () => {
    const box = {
      type: typesMap.BOX,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0]],
      boxFill: [boxFillMap.SOLID]
    };
    this.mainList.push(box);
  };
  @action onChangeBoxFill = (index, item, { target: { checked }}) => {
    const data = this.mainList[index];
    let boxFill;
    if (checked) {
      switch (item) {
        case boxFillMap.SOLID: boxFill = [boxFillMap.SOLID]; break;
        case boxFillMap.ALL: boxFill = [boxFillMap.ALL]; break;
        default: {
          boxFill = data.boxFill.filter(i => i !== boxFillMap.SOLID);
          boxFill.push(item);
          if (boxFill.length === 6) {
            boxFill.push(boxFillMap.ALL);
          }
        }
      }
    } else {
      if (item === boxFillMap.ALL) {
        boxFill = [boxFillMap.SOLID];
      } else {
        boxFill = data.boxFill.filter(i => i !== item && i !== boxFillMap.ALL);
        if (data.boxFill.length === 0) {
          boxFill = [boxFillMap.SOLID]
        }
      }
    }
    data.boxFill = boxFill;
  };
  // Sphere
  @action onAddSphere = () => {
    const sphere = {
      type: typesMap.SPHERE,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      point: [0, 0, 0],
      radius: 1
    };
    this.mainList.push(sphere);
  };
  // Cylinder
  @action onAddCylinder = () => {
    const cylinder = {
      type: typesMap.CYLINDER,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0]],
      radius: 1
    };
    this.mainList.push(cylinder);
  };
  // Beach
  @action onAddBeach = () => {
    const cylinder = {
      type: typesMap.BEACH,
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.mainList.push(cylinder);
  };
  // File
  @action onAddFile = (path, type) => {
    const file = {
      type: 'file',
      isFluid: false,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      path: path,
      fileType: type
    };
    this.mainList.push(file);
  };
  // Fill
  @action onAddFill = () => {
    const fill = {
      type: 'fill',
      isFluid: true,
      shapeMode: [shapeModeMap.REAL, shapeModeMap.BOUND],
      drawMode: drawModeMap.FULL,
      transform: {
        move: null,
        scale: null,
        rotate: null
      },
      initial: {
        velocity: null,
        wave: null
      },
      motion: null,
      float: null,
      fillType: fillTypeMap.POINT,
      fillMode: [fillModeMap.FLUID],
      point: [0, 0, 0],
      points: []
    };
    this.mainList.push(fill);
  };
  @action onChangeFillType = (index, { target: { value } }) => {
    const data = this.mainList[index];
    data.fillType = value;
    const p = [0, 0, 0];
    const ps = [p, p, p, p, p, p];
    switch (value) {
      case fillTypeMap.POINT: data.points = []; break;
      case fillTypeMap.BOX: {
        data.points = [...data.points, ...ps].slice(0, 2);
        break;
      }
      case fillTypeMap.FIGURE: {
        data.points = [...data.points, ...ps].slice(0, 4);
        break;
      }
      case fillTypeMap.PRISM: {
        data.points = [...data.points, ...ps].slice(0, 6)
      }
    }
  };
  @action onChangeFillMode = (index, checkedValues) => {
    const data = this.mainList[index];
    data.fillMode = checkedValues;
  };

  // 删除物件
  @action onDeleteObject = (index) => {
    this.mainList.splice(index, 1);
  };
  // 更改物件类型 流体/边界
  @action onChangeType = (index, e) => {
    this.mainList[index].isFluid = e.target.value === 'fluid';
  };
  // 更改DrawMode 线/面/内部/实体
  @action onChangeDrawMode = (index, e) => {
    this.mainList[index].drawMode = e.target.value;
  };
  // 更改ShapeMode real/dp/fluid...
  @action onChangeShapeMode = (index, checkedValues) => {
    if (checkedValues.length === 0) checkedValues = [shapeModeMap.REAL];
    this.mainList[index].shapeMode = checkedValues;
  };
  // 更改变换 移动属性
  @action onToggleTransformMove = (index) => {
    const { transform } = this.mainList[index];
    transform.move = transform.move ?
      null : [0, 0, 0];
  };
  @action onChangeTransformMove = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.move[i] = value;
  };
  // 更改变换 缩放属性
  @action onToggleTransformScale = (index) => {
    const { transform } = this.mainList[index];
    transform.scale = transform.scale ?
      null : [0, 0, 0];
  };
  @action onChangeTransformScale = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.scale[i] = value;
  };
  // 更改变换 旋转属性
  @action onToggleTransformRotate = (index) => {
    const { transform } = this.mainList[index];
    transform.rotate = transform.rotate ?
      null : [0, 0, 0, 0];
  };
  @action onChangeTransformRotate = (index, i, value) => {
    const { transform } = this.mainList[index];
    transform.rotate[i] = value;
  };
  // 添加/删除/编辑点
  @action onAddPoint = (index, point) => {
    if (!Array.isArray(point)) point=[0, 0, 0];
    this.mainList[index].points.push(point);
  };
  @action onDeletePoint = (index, i, min) => {
    if (typeof min !== 'number') min = 2;
    const { points } = this.mainList[index];
    if (points.length <= min) {
      return message.warning(`至少包含${min}个点`);
    }
    points.splice(i, 1);
  };
  @action onChangePoint = (index, i, j, v) => {
    if (typeof v === 'object') v = v.target.value;
    this.mainList[index].points[i][j] = v;
  };
  @action onChangeSinglePoint = (index, i, v) => {
    const { point } = this.mainList[index];
    point[i] = v;
  };
  // 编辑半径
  @action onChangeRadius = (index, v) => {
    this.mainList[index].radius = v;
  };
  // 初始速度
  @action onToggleInitVelocity = (index) => {
    const { initial } = this.mainList[index];
    initial.velocity = initial.velocity ? null : [0, 0, 0];
  };
  @action onChangeInitVelocity = (index, i, v) => {
    const { initial: { velocity } } = this.mainList[index];
    velocity[i] = v;
  };
  // 初始孤立波
  @action onToggleInitWave = (index) => {
    const { initial } = this.mainList[index];
    initial.wave = initial.wave ? null : [0, 0, 0];
  };
  @action onChangeInitWave = (index, i, v) => {
    const { initial: { wave } } = this.mainList[index];
    wave[i] = v;
  };
  // 漂浮物属性
  @action onToggleFloat = (index) => {
    const data = this.mainList[index];
    data.float = data.float ? null : {
      relativeweight: 1,
      rhopbody: null,
      massbody: null,
      center: null,
      inertia: null,
      velini: null,
      omegaini: null
    };
  };
  @action onToggleFloatAttr = (index, attr) => {
    const { float } = this.mainList[index];
    float[attr] = float[attr] || float[attr] === 0 ?
      null : defaultFloatAttrMap[attr.toUpperCase()];
    if (Object.keys(float).filter(k => float[k] !== null).length === 0) {
      this.mainList[index].float = null;
    }
  };
  @action onChangeFloatAttrNumber = (index, attr, v) => {
    const { float } = this.mainList[index];
    float[attr] = v;
  };
  @action onChangeFloatAttrArray = (index, attr, i, v) => {
    const { float } = this.mainList[index];
    float[attr][i] = v;
  };

  /*
  *** Motion
   */
  @action onToggleMotion = (index) => {
    const data = this.mainList[index];
    if (data.motion) {
      data.motion = null;
    } else {
      data.motion = [];
      this.onAddMotion(index);
    }
  };
  @action onAddMotion = (index) => {
    const { motion } = this.mainList[index];
    motion.push({
      type: 'linear',
      duration: 1,
      vel: [0, 0, 0],
      ace: null,
      // rotate
      axisp1: null,
      axisp2: null,
      // sin
      freq: null,
      ampl: null,
      phase: null,
      ref: null
    });
  };
  @action onDeleteMotion = (index, i) => {
    const { motion } = this.mainList[index];
    if (motion.length === 1) return this.mainList[index].motion = null;
    motion.splice(i, 1);
  };
  @action onChangeMotionType = (index, i, {target: { value }}) => {
    const { motion } = this.mainList[index];
    const m = motion[i];
    m.type = value;
    switch (value) {
      case 'linear': {
        m.vel = [0, 0, 0];
        m.ace = [0, 0, 0];
        m.axisp1 = null;
        m.axisp2 = null;
        m.freq = null;
        m.ampl = null;
        m.phase = null;
        m.ref = null;
        break;
      }
      case 'rotate': {
        m.vel = 0;
        m.ace = null;
        m.axisp1 = motion.axisp1 || [0, 0, 0];
        m.axisp2 = motion.axisp2 || [0, 0, 0];
        m.freq = null;
        m.ampl = null;
        m.phase = null;
        m.ref = null;
        break;
      }
      case 'sin': {
        m.vel = null;
        m.ace = null;
        m.axisp1 = null;
        m.axisp2 = null;
        m.freq = [0, 0, 0];
        m.ampl = [0, 0, 0];
        m.phase = [0, 0, 0];
        m.ref = null;
        break;
      }
      case 'pause': {
        m.vel = null;
        m.ace = null;
        m.axisp1 = null;
        m.axisp2 = null;
        m.freq = null;
        m.ampl = null;
        m.phase = null;
        m.ref = null;
        break;
      }
    }
  };
  @action onChangeMotionDuration = (index, i, value) => {
    const { motion } = this.mainList[index];
    motion[i].duration = value || 0;
  };
  @action onChangeMotionVel = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].vel[j] = value;
  };
  @action onToggleMotionAce = (index, i) => {
    const motion = this.mainList[index].motion[i];
    motion.ace = motion.ace ? null : [0, 0, 0];
  };
  @action onChangeMotionAce = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].ace[j] = value;
  };
  @action onChangeMotionRef = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].ref[j] = value;
  };
  @action onChangeMotionFreq = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].freq[j] = value;
  };
  @action onChangeMotionAmpl = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].ampl[j] = value;
  };
  @action onChangeMotionPhase = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].phase[j] = value;
  };
  @action onChangeMotionAxisp1 = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].axisp1[j] = value;
  };
  @action onChangeMotionAxisp2 = (index, i, j, value) => {
    const { motion } = this.mainList[index];
    motion[i].axisp2[j] = value;
  };
  @action onChangeMotionValue = (index, i, key, value) => {
    const { motion } = this.mainList[index];
    motion[i][key] = value;
  };
  /*
  *** Wave
   */
  @observable waves = [];
  @computed get waveTimeLine() {
    return this.waves.reduce((accu, i) => {
      const { length } = accu;
      if (length) {
        const last = accu[length - 1];
        accu.push([last[1], last[1] + i.duration]);
      } else {
        accu.push([0, i.duration]);
      }
      return accu;
    }, []);
  }
  @action onAddWave = () => {
    const wave = {
      isRegular: true,
      duration: 1,
      depth: 0,
      fixedDepth: 0,
      direction: [1, 0, 0],
      height: 0.1,
      period: 0.1,
      phase: 0,
      ramp: 0,
      // irregular
      spectrum: null,
      discretization: null,
      peakCoef: null,
      waves: null,
      randomSeed: null,
      serieIni: null,
      rampTime: null
    };
    this.waves.push(wave);
  };
  @action onDeleteWave = (index) => {
    this.waves.splice(index, 1);
  };
  @action onChangeWaveType = (index, {target: { value }}) => {
    const wave = this.waves[index];
    wave.isRegular = value;
    if (!value) {
      wave.spectrum = {
        value: 'Jonswap',
          options: ['Jonswap', 'Pierson-moskowitz']
      };
      wave.discretization = {
        value: 'Stretched',
          options: ['Regular', 'Random', 'Stretched', 'Cosstretched']
      };
      wave.peakCoef = 3.3;
      wave.waves = 50;
      wave.randomSeed = 2;
      wave.serieIni = 0;
      wave.rampTime = 0;
    } else {
      wave.spectrum = null;
      wave.discretization = null;
      wave.peakCoef = null;
      wave.waves = null;
      wave.randomSeed = null;
      wave.serieIni = null;
      wave.rampTime = null;
    }
  };
  @action onChangeWaveValue = (index, key, v) => {
    const wave = this.waves[index];
    wave[key] = v || 0;
  };
  @action onChangeWaveOption = (index, key, {target: { value }}) => {
    const wave = this.waves[index];
    wave[key].value = value || 0;
  };
  @action onChangeWaveDirection = (index, i, v) => {
    const wave = this.waves[index];
    wave.direction[i] = v;
  };

  /*
  *** GenXML
   */
  genXML = () => {
    const xml = genXML(this);
    console.log(xml);
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
