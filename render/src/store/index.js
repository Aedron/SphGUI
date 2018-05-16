
import React from 'react';
import { observable, action, computed, runInAction } from 'mobx';
import { message } from 'antd';

import { loadTemplate, genXML } from './utils';
import { hoc, data } from '../utils';


const {
  shapeModeMap, typesMap, drawModeMap,
  boxFillMap, boxFills, fillTypeMap,
  fillModeMap, defaultFloatAttrMap
} = data;

const { remote, ipcRenderer } = window.require('electron');
const { dialog } = remote.require('electron');
const remoteRequire = remote.require;
const fs = remoteRequire('fs-extra');
const path = remoteRequire('path');
const os = remoteRequire('os');
const cp = remoteRequire('child_process');
const { app } = remoteRequire('./index.js');


class Store {
  constructor() {
    ipcRenderer.on('run', this.runAction);
    ipcRenderer.on('exit', this.killAll);
  }
  @action runAction = (sender, type) => {
    switch (type) {
      case 'save': return this.onSaveXML();
      case 'exec': return null;
    }
  };
  /*
  *** view
   */
  @observable viewIndex = 0;
  @action toggleView = (view) => {
    if ((view === 2 || view === 'editor') && !this.xmlContent) {
      return this.selectXML();
    }
    if (typeof view === 'number') this.viewIndex = view;
    else {
      const index = this.views.indexOf(view);
      if (index >= 0) this.viewIndex = index;
    }
  };
  @computed get view() {
    return this.views[this.viewIndex];
  }
  views = ['model', 'args', 'editor', 'conf', 'about'];
  /*
  *** FileType
   */
  @observable selectedFileTypes = ['xml', 'bi4', 'vtk'];
  @action selectFileType = (type) => {
    const index = this.selectedFileTypes.indexOf(type);
    if (index >= 0) this.selectedFileTypes.splice(index, 1);
    else this.selectedFileTypes.push(type);
  };
  // 环境常量
  @observable constants = loadTemplate('constants');
  /*
  *** Args
   */
  @action onChangeCon = (i, j, e) => {
    const value = typeof e === 'object' ? e.target.value : e;
    if (j || j === 0) {
      this.constants[i].value[j] = value || 0;
    } else {
      this.constants[i].value = value || 0;
    }
  };
  // 执行参数
  @observable params = loadTemplate('params');
  @action onCheckParams = (i, checked) => {
    const { params } = this;
    params[i].disable = !checked;
  };
  @action onChangeParams = (i, e) => {
    const { params } = this;
    params[i].value = typeof e === 'object' ? e.target.value : e;
  };
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
  @observable onChangeContainer = (isMax, i, value) => {
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
      },
      motion: null,
      float: null,
      points: [[0, 0, 0], [1, 1, 1]],
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
      wave: {
        regular: null,
        irregular: null
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
  @action onToggleWave = (index, isRegular) => {
    const { wave } = this.mainList[index];
    if (isRegular) {
      if (wave.regular) {
        wave.regular = null;
      } else {
        this.onAddWave(index, true);
      }
    } else {
      if (wave.irregular) {
        wave.irregular = null;
      } else {
        this.onAddWave(index, false);
      }
    }
  };
  @action onAddWave = (index, isRegular) => {
    const { wave } = this.mainList[index];
    if (isRegular) {
      wave.regular = {
        start: 0,
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
    } else {
      wave.irregular = {
        start: 0,
        duration: 1,
        depth: 0,
        fixedDepth: 0,
        direction: [1, 0, 0],
        height: 0.1,
        period: 0.1,
        phase: null,
        ramp: null,
        // irregular
        spectrum: {
          value: 'Jonswap',
          options: ['Jonswap', 'Pierson-moskowitz']
        },
        discretization: {
          value: 'Stretched',
          options: ['Regular', 'Random', 'Stretched', 'Cosstretched']
        },
        peakCoef: 3.3,
        waves: 50,
        randomSeed: 2,
        serieIni: 0,
        rampTime: 0
      }
    }
  };
  @action onChangeWaveValue = (index, isRegular, key, v) => {
    const { wave: { regular, irregular } } = this.mainList[index];
    (isRegular ? regular : irregular)[key] = v || 0;
  };
  @action onChangeWaveOption = (index, isRegular, key, {target: { value }}) => {
    const { wave: { regular, irregular } } = this.mainList[index];
    (isRegular ? regular : irregular)[key].value = value || 0;
  };
  @action onChangeWaveDirection = (index, isRegular, i, v) => {
    const { wave: { regular, irregular } } = this.mainList[index];
    (isRegular ? regular : irregular).direction[i] = v;
  };
  /*
  *** Editor
   */
  @observable fileContent = null;
  @observable xmlContent = null;
  @observable xmlPath = null;
  @action selectXML = () => {
    const xmlPath = dialog.showOpenDialog({
      title: '导入外部算例',
      properties: ['openFile'],
      filters: [
        { name: '算例文件', extensions: ['xml'] }
      ]
    });
    if (xmlPath) {
      this.xmlPath = xmlPath[0];
      const content = fs.readFileSync(this.xmlPath, 'utf-8');
      this.xmlContent = content;
      this.fileContent = content;
      this.toggleView('editor');
    }
  };
  @action onChangeXML = (content, action) => {
    this.xmlContent = content;
  };
  @action onSaveXML = () => {
    if (this.view !== 'editor') return;
    fs.writeFileSync(this.xmlPath, this.xmlContent, 'utf-8');
    this.fileContent = this.xmlContent;
  };
  @computed get isFileChanged() {
    return this.xmlContent !== this.fileContent;
  }
  /*
  *** GenXML
   */
  @observable savePath = null;
  @computed get filePath() {
    if (!this.savePath) return null;
    return path.join(this.savePath, './Case_Def.xml');
  };
  @action selectSavePath = (callback) => {
    const path = dialog.showOpenDialog({
        title: '选择文件夹',
        properties: ['openDirectory']
    });
    if (!path) return;
    this.savePath = path[0];
    callback && runInAction(callback);
  };
  @action genXML = (xml) => {
    const { savePath, filePath } = this;
    if (!savePath) {
      return this.selectSavePath(this.genXML.bind(this, xml));
    }

    if (!xml) xml = genXML(this);
    if (fs.existsSync(filePath)) {
      return dialog.showMessageBox({
        type: 'question',
        title: '覆盖Case文件',
        message: `${filePath}已存在, 是否覆盖?`,
        buttons: ['覆盖', '取消'],
        defaultId: 0
      }, (selected) => {
        if (selected === 0) {
          fs.removeSync(filePath);
          fs.writeFileSync(filePath, xml, 'utf-8');
        }
      });
    }
    fs.writeFileSync(filePath, xml, 'utf-8');
  };
  /*
  *** Exec
   */
  @observable execing = false;
  @observable stepIndex = -1;
  @observable fileProcess = [0, 0];
  @computed get step() {
        const { fileProcess: [done, total], stepIndex } = this;
        return [
            ['生成算例', []],
            ['预处理', ['生成算例']],
            [`计算粒子数据\n已完成: ${done}\n一共: ${total}`, ['生成算例', '预处理']],
            ['格式转换', ['生成算例', '预处理', '计算粒子数据']],
            ['保存文件', ['生成算例', '预处理', '计算粒子数据', '格式转换']],
            [null, ['生成算例', '预处理', '计算粒子数据', '格式转换', '完成']]
        ][stepIndex];
  }
  @action stopExec = () => {
    this.execing = false;
    this.stepIndex = -1;
    this.killAll();
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  };
  @action exec = async () => {
    this.execing = true;
    if (!this.savePath) {
      const callback = () => {
          fs.writeFileSync(this.filePath, this.xmlContent, 'utf-8');
          this.exec();
      };
      return this.selectSavePath(callback.bind(this));
    }
    const outPath = path.join(this.savePath, './Case_out');
    if (fs.existsSync(outPath)) {
      fs.removeSync(outPath);
    }
    fs.mkdirSync(outPath);
    try {
      await this.execGenCase();
      await this.execSPH();
      await this.execPartVtk();
    } catch (e) {
      this.stopExec();
    }
    this.execing = false;
  };
  // GenCase
  @action execGenCase = () => {
    this.stepIndex = 0;
    const platform = os.platform();
    const binPath = path.join(app.getAppPath(), `./bin/${platform}/GenCase`);
    const command = `cd ${this.savePath}; ${binPath} Case_Def Case_out/Case -save:all`;
    return this.execCommand(command);
  };
  // SPH
  @action execSPH = () => {
    this.stepIndex = 1;
    this.watchPartFile();
    setTimeout(() => { this.stepIndex = 2 }, 3000);
    const platform = os.platform();
    const binPath = path.join(app.getAppPath(), `./bin/${platform}/DualSPH`);
    const command = `cd ${this.savePath}; ${binPath} Case_out/Case Case_out -svres -cpu`;
    return this.execCommand(command);
  };
  watcher = null;
  @action watchPartFile = () => {
    const { filePath, fileProcess } = this;
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      const boundCount = parseInt(content.match(/boundcount="\d+"/)[0].match(/\d+/)[0]);
      const fluidCount = parseInt(content.match(/fluidcount="\d+"/)[0].match(/\d+/)[0]);
      fileProcess[1] = boundCount + fluidCount;
    } catch (e) {
      return this.stopExec();
    }
    const w = (function (num) {
      this.stepIndex = 2;
      this.fileProcess[0] = num;
    }).bind(this);
    const watchPath = path.join(this.savePath, './Case_out');
    const watcher = fs.watch(watchPath, { persistent: true }, () => {
      const num = fs.readdirSync(watchPath).filter(p => /Part_\d+\.bi4/.test(p)).length;
      w(num);
    });
    this.watcher = watcher;
  };
  @action execPartVtk = () => {
    this.stepIndex = 3;
    const platform = os.platform();
    const VTKBinPath = path.join(app.getAppPath(), `./bin/${platform}/PartVTK`);
    const VTKOutBinPath = path.join(app.getAppPath(), `./bin/${platform}/PartVTKOut`);
    const command = [
      `cd ${this.savePath}; ${VTKBinPath}`,
      `-dirin Case_out -filexml Case_out/Case.xml`,
      `-savevtk Case_out/PartFluid`,
      `-onlytype:-all,fluid -vars:+idp,+vel,+rhop,+press,+vor;`,
      `${VTKOutBinPath} -dirin Case_out -filexml Case_out/Case.xml`,
      `-savevtk Case_out/PartFluidOut`,
      `-SaveResume Case_out/ResumeFluidOut`
    ].join(' ');
    return this.execCommand(command);
  };
  // Utils
  tasks = [];
  removeTask = (task) => this.tasks = this.tasks.filter(i => i === task);
  killAll = () => {
    this.tasks.forEach((task) => {
      try {
        task.kill();
      } catch (e) {
        console.error('Kill process failed: ', e);
      }
    });
    this.tasks = [];
  };
  onProcessData = (data) => {
    console.log(data);
    console.log('\n');
    if (/\*\*\*\sException/.test(data)) {
      const e = '*** Exception' + (data || 'Unknown Error').toString().split('*** Exception')[1];
      dialog.showErrorBox('出错', e.trim());
    }
  };
  execCommand = (command) => {
    console.log('exec: ', command);
    const { removeTask } = this;
    return new Promise((resolve, reject) => {
      const process = cp.exec(command);
      this.tasks.push(process);
      process.stdout.on('data', this.onProcessData);
      process.on('exit', function (code) {
        removeTask(process);
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
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
