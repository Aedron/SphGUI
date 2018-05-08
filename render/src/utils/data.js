
const typesMap = {
  LINE: 'line',
  TRIANGLES: 'triangles',
  PYRAMID: 'pyramid',
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


export {
  typesMap,
  shapeModes, shapeModeMap,
  drawModes, drawModeMap
}
