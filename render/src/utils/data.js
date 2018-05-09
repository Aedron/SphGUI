
const typesMap = {
  LINE: 'line',
  TRIANGLES: 'triangles',
  QUADRI: 'quadri',
  STRIP: 'strip',
  PYRAMID: 'pyramid',
  PRISM: 'prism',
  BOX: 'box',
  SPHERE: 'sphere',
  CYLINDER: 'cylinder',
  BEACH: 'beach'
};

const shapeModes = ['real', 'dp', 'fluid', 'bound', 'void'];
const shapeModeMap = {
  REAL: 'real',
  DP: 'dp',
  FLUID: 'fluid',
  BOUND: 'bound',
  VOID: 'void'
};

const drawModes = ['wire', 'face', 'solid', 'full'];
const drawModeMap = {
  WIRE: 'wire',
  FACE: 'face',
  SOLID: 'solid',
  FULL: 'full'
};

const boxFills = [
  'solid', 'all', 'top', 'bottom', 'left',
  'right', 'front', 'back'
];
const boxFillMap = {
  SOLID: 'solid',
  ALL: 'all',
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  FRONT: 'front',
  BACK: 'back'
};

const fileTypes = ['vtk', 'ply', 'stl'];
const fileTypeMap = {
  VTK: 'vtk',
  PLY: 'ply',
  STL: 'stl'
};

const fillTypes = ['point', 'box', 'figure', 'prism'];
const fillTypeMap = {
  POINT: 'point',
  BOX: 'box',
  FIGURE: 'figure',
  PRISM: 'prism'
};

const fillModes = ['void', 'fluid', 'bound', 'border'];
const fillModeMap = {
  VOID: 'void',
  FLUID: 'fluid',
  BOUND: 'bound',
  BORDER: 'border'
};

const floatAttrMap = {
  RHOPBODY: 'rhopbody',
  RELATIVE_WEIGHT: 'relativeweight',
  MASSBODY: 'massbody',
  CENTER: 'center',
  INERTIA: 'inertia',
  VELINI: 'velini',
  OMEGAINI: 'omegaini'
};


export {
  typesMap,
  shapeModes, shapeModeMap,
  drawModes, drawModeMap,
  boxFills, boxFillMap,
  fileTypes, fileTypeMap,
  fillTypes, fillTypeMap,
  fillModes, fillModeMap,
  floatAttrMap
}
