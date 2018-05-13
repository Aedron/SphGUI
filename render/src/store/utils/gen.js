import {toJS} from 'mobx';
import {data, genTimeLine} from '../../utils';


const {fillTypeMap} = data;


/*
*** XML Generator
 */

// Params
function genParams(params) {
  const p = params.map(p => {
    const {name, value, disable, unit} = p;
    const k = disable ? `#${name}` : name;
    return `<parameter ${genKV('key', k)}${genKV('value', value)}${genKV('units_comment', unit)}/>`
  }).join('\n');
  return `<parameters>${p}</parameters>`
}

// Container
function genDefinition(definition) {
  const {dp, min, max} = definition;
  return [
    `<definition dp="${dp}" units_comment="metres (m)">`,
    `<pointmin x="${min[0]}" y="${min[1]}" z="${min[2]}" />`,
    `<pointmax x="${max[0]}" y="${max[1]}" z="${max[2]}" />`,
    `</definition>`
  ].join('\n')
}

// Bundle
function genMkConfig(mkConfig) {
  const {boundCount, fluidCount} = mkConfig;
  return `<mkconfig boundcount="${boundCount}" fluidcount="${fluidCount}" />\n`
}

// Constants
function genConstants(constants) {
  const v = constants.map((i) => {
    let {name, value, displayName, unit} = i;
    value = (Array.isArray(toJS(value)) ? value : [['value', value]])
      .map(([k, v]) => genKV(k, v)).join('');
    displayName = genKV('comment', displayName);
    unit = genKV('units_comment', unit);
    return `<${name} ${value}${displayName}${unit}/>`
  }).join('\n');
  return `<constantsdef>\n${v}\n</constantsdef>`
}

// MainList
function genMainList(mainlist) {
  const m = mainlist.map((m, index) => {
    const {type} = m;
    const common = genCommon(m, index);
    const transform = genTransform(m, index);
    let genCommand;
    switch (type) {
      case 'line':
        genCommand = genLine;
        break;
      case 'triangles':
        genCommand = genTriangles;
        break;
      case 'quadri':
        genCommand = genQuadri;
        break;
      case 'strip':
        genCommand = genStrip;
        break;
      case 'pyramid':
        genCommand = genPyramid;
        break;
      case 'prism':
        genCommand = genPrism;
        break;
      case 'box':
        genCommand = genBox;
        break;
      case 'sphere':
        genCommand = genSphere;
        break;
      case 'cylinder':
        genCommand = genCylinder;
        break;
      case 'beach':
        genCommand = genBeach;
        break;
      case 'fill':
        genCommand = genFill;
        break;
      default:
        genCommand = () => "";
        break;
    }
    const command = genCommand(m, index);
    return `<!--Draw ${type}--/>\n${common}\n${transform}\n${command}`
  }).join('\n');
  return `<mainlist>${m}</mainlist>`
}

// Initials
function genInitials(mainlist) {
  return mainlist.map((item, index) => {
    const {isFluid, initial: {velocity, wave}} = item;
    let initial = [];

    const mk = genKV(isFluid ? 'mkfluid' : 'mkbound', index);
    if (velocity) {
      initial.push(`<velocity ${mk}${genKVS(velocity)}/>`);
    }
    if (wave) {
      const [x, y, z] = wave;
      initial.push(`<wave ${mk}${genKVS(wave)} />`);
    }
    return initial.join('\n');
  }).filter(i => i.length).join('\n');
}

// Floatings
function genFloatings(mainlist) {
  return mainlist.map((item, index) => {
    const {isFluid, float} = item;
    let floatings = [];

    const mk = genKV(isFluid ? 'mkfluid' : 'mkbound', index);
    if (float) {
      const {
        relativeweight, rhopbody, massbody,
        center, inertia, velini, omegaini
      } = float;
      const rw = relativeweight ? genKV('relativeweight', relativeweight) : '';
      floatings.push(`<floating ${mk}${rw}>`);
      massbody && floatings.push(`<massbody value="${massbody}" />`);
      rhopbody && floatings.push(`<rhopbody value="${rhopbody}" />`);
      center && floatings.push(`<center ${genKVS(center)}/>`);
      inertia && floatings.push(`<inertia ${genKVS(inertia)}/>`);
      velini && floatings.push(`<velini ${genKVS(velini)}/>`);
      omegaini && floatings.push(`<omegaini ${genKVS(omegaini)}/>`);
      floatings.push(`</floating>`);
    }
    return floatings.join('\n');
  }).filter(i => i.length).join('\n');
}

// Motion
function genMotion(mainlist) {
  return mainlist
    .map(i => i.motion)
    .map(genMotionItem)
    .filter(i => i.trim())
    .join('');
}

function genMotionItem(rawMotions, index) {
  if (!rawMotions) return '';
  const motions = genTimeLine(rawMotions).map((m, i) => {
    const isLast = i === rawMotions.length - 1;
    switch (m.type) {
      case 'linear':
        return genLinearMotion(m, i + 1, isLast);
      case 'rotate':
        return genRotateMotion(m, i + 1, isLast);
      case 'sin':
        return genSinMotion(m, i + 1, isLast);
      case 'pause':
        return genPauseMotion(m, i + 1, isLast);
      default:
        return '';
    }
  }).join('\n');
  return `<objreal ref="${index}"><begin mov="1" start="0" />${motions}</objreal>`
}

function genLinearMotion(motion, id, isLast) {
  const {vel, ace, duration} = motion;
  const props = `id="${id}" duration="${duration}"${isLast ? '' : ` next="${id + 1}"`}`;
  if (!ace) {
    return `<mvrect ${props}><vel ${genKVS(vel)}/></mvrect>`;
  }
  return `<mvrectace ${props}><vel ${genKVS(vel)}/><ace ${genKVS(ace)}/></mvrectace>`;
}

function genRotateMotion(motion, id, isLast) {
  const {vel, ace, ref, axisp1, axisp2, duration} = motion;
  const props = `id="${id}" duration="${duration}"${isLast ? '' : ` next="${id + 1}"`}`;
  if (!ace && ace !== 0) {
    return [
      `<mvrot ${props}>`,
      `<vel ang="${vel}" />`,
      `<axisp1 ${genKVS(axisp1)}/>`,
      `<axisp2 ${genKVS(axisp2)}/>`,
      `</mvrot>`
    ].join('\n');
  } else if (!ref) {
    return [
      `<mvrotace ${props}>`,
      `<ace ang="${ace}" />`,
      `<velini ang="${vel}" />`,
      `<axisp1 ${genKVS(axisp1)}/>`,
      `<axisp2 ${genKVS(axisp2)}/>`,
      `</mvrotace>`
    ].join('\n');
  } else {
    return [
      `<mvcirace ${props}>`,
      `<ace ang="${ace}" />`,
      `<velini ang="${vel}" />`,
      `<ref ${genKVS(ref)}/>`,
      `<axisp1 ${genKVS(axisp1)}/>`,
      `<axisp2 ${genKVS(axisp2)}/>`,
      `</mvcirace>`
    ].join('\n');
  }
}

function genSinMotion(motion, id, isLast) {
  const {
    duration, ref, axisp1,
    axisp2, freq, ampl, phase
  } = motion;
  const props = `id="${id}" duration="${duration}"${isLast ? '' : ` next="${id + 1}"`}`;
  if (!axisp1) {
    return [
      `<mvrectsinu ${props}>`,
      `<freq ${genKVS(freq)}/>`,
      `<ampl ${genKVS(ampl)}/>`,
      `<phase ${genKVS(phase)}/>`,
      `</mvrectsinu>`
    ].join('\n');
  } else if (!ref) {
    return [
      `<mvrotsinu ${props}>`,
      `<axisp1 ${genKVS(axisp1)}/>`,
      `<axisp2 ${genKVS(axisp2)}/>`,
      `<freq v="${freq}" />`,
      `<ampl v="${ampl}" />`,
      `<phase v="${phase}" />`,
      `</mvrotsinu>`
    ].join('\n');
  } else {
    return [
      `<mvcirsinu ${props}>`,
      `<ref ${genKVS(ref)}/>`,
      `<axisp1 ${genKVS(axisp1)}/>`,
      `<axisp2 ${genKVS(axisp2)}/>`,
      `<freq v="${freq}" />`,
      `<ampl v="${ampl}" />`,
      `<phase v="${phase}" />`,
      `</mvcirsinu>`
    ].join('\n');
  }
}

function genPauseMotion(motion, id, isLast) {
  const {duration} = motion;
  const props = `id="${id}" duration="${duration}"${isLast ? '' : ` next="${id + 1}"`}`;
  return `<wait ${props} />`;
}

// Wave
function genWave(mainlist) {
  return mainlist.map(({wave: {regular, irregular}}, index) => {
    if (!regular && !irregular) return '';
    return [
      regular ? genRegularWave(regular, index) : '',
      irregular ? genIrregularWave(irregular, index) : ''
    ].filter(i => i.trim()).join('');
  }).filter(i => i.trim()).join('');
}

function genRegularWave(wave, index) {
  const {
    start, duration, depth, fixedDepth,
    direction, height, period, phase, ramp
  } = wave;
  return [
    `<piston>`,
    `<mkbound value="${index}" />`,
    `<waveorder value="1" />`,
    `<start value="${start}" />`,
    `<duration value="${duration}" />`,
    `<depth value="${depth}" />`,
    `<fixeddepth value="${fixedDepth}" />`,
    `<pistondir ${genKVS(direction)}/>`,
    `<waveheight value="${height}" />`,
    `<waveperiod value="${period}" />`,
    `<phase value="${phase}" />`,
    `<ramp value="${ramp}" />`,
    `</piston>`
  ].join('\n');
}

function genIrregularWave(wave, index) {
  const {
    start, duration, depth, fixedDepth,
    direction, height, period,
    spectrum, discretization, peakCoef,
    waves, randomSeed, serieIni, rampTime
  } = wave;
  return [
    `<piston_spectrum>`,
    `<mkbound value="${index}" />`,
    `<waveorder value="2" />`,
    `<start value="${start}" />`,
    `<duration value="${duration}" />`,
    `<depth value="${depth}" />`,
    `<fixeddepth value="${fixedDepth}" />`,
    `<pistondir ${genKVS(direction)}/>`,
    `<spectrum value="${spectrum.value}" />`,
    `<discretization value="${discretization.value}" />`,
    `<waveheight value="${height}" />`,
    `<waveperiod value="${period}" />`,
    `<peakcoef value="${peakCoef}" />`,
    `<waves value="${waves}" />`,
    `<randomseed value="${randomSeed}" />`,
    `<serieini value="${serieIni}" autofit="true" />`,
    `<ramptime value="${rampTime}" />`,
    `</piston_spectrum>`
  ].join('\n');
}


/*
*** 形状
 */

// line
function genLine(line) {
  const {points} = line;
  return [
    `<drawline>`,
    points
      .map(([x, y, z]) => `<point x="${x}" y="${y}" z="${z}" />`)
      .join('\n'),
    `</drawline>`
  ].join('\n');
}

// triangle
function genTriangles(triangle) {
  const {points} = triangle;
  return [
    `<drawtriangle>`,
    points.map(genPoint).join('\n'),
    `</drawtriangle>`
  ].join('\n');
}

function genQuadri(quadri) {
  const {points} = quadri;
  return [
    `<drawquadri>`,
    points.map(genPoint).join('\n'),
    `</drawquadri>`
  ].join('\n');
}

function genStrip(strip) {
  const {points} = strip;
  return [
    `<drawtrianglesstrip>`,
    points.map(genPoint).join('\n'),
    `</drawtrianglesstrip>`
  ].join('\n');
}

// pyramid
function genPyramid(pyramid) {
  const {points} = pyramid;
  return [
    `<drawpyramid>`,
    points.map(genPoint).join('\n'),
    `</drawpyramid>`
  ].join('\n');
}

// prism
function genPrism(prism) {
  const {points} = prism;
  return [
    `<drawprism>`,
    points.map(genPoint).join('\n'),
    `</drawprism>`
  ].join('\n');
}

// box
function genBox(box) {
  const {
    points: [point, [sx, sy, sz]],
    boxFill
  } = box;
  return [
    `<drawbox>`,
    `<boxfill>${boxFill.join(' | ')}</boxfill>`,
    genPoint(point),
    `<size x="${sx}" y="${sy}" z="${sz}" />`,
    `</drawbox>`
  ].join('\n');
}

// sphere
function genSphere(sphere) {
  const {point, radius} = sphere;
  return [
    `<drawsphere radius="${radius}">`,
    genPoint(point),
    `</drawsphere>`
  ].join('\n');
}

// cylinder
function genCylinder(cylinder) {
  const {points, radius} = cylinder;
  return [
    `<drawsphere radius="${radius}">`,
    points.map(genPoint).join('\n'),
    `</drawsphere>`
  ].join('\n');
}

// beach
function genBeach(beach) {
  const {points} = beach;
  return [
    `<drawbeach>`,
    points.map(genPoint).join('\n'),
    `</drawsphere>`
  ].join('\n');
}

// fill
function genFill(fill) {
  const {fillType, fillMode, point: [x, y, z], points} = fill;
  const mode = `<modefill>${fillMode.join(' | ')}</modefill>`;
  switch (fillType) {
    case fillTypeMap.POINT: {
      return `<fillpoint x="${x}" y="${y}" z="${z}">${mode}</fillpoint>`;
    }
    case fillTypeMap.BOX: {
      const [point, [sx, sy, sz]] = points;
      return [
        `<fillbox x="${x}" y="${y}" z="${z}">`,
        mode,
        genPoint(point),
        `<size x="${sx}" y="${sy}" z="${sz}" />`,
        `</fillbox>`
      ].join('\n');
    }
    case fillTypeMap.PRISM: {
      return [
        `<fillprism x="${x}" y="${y}" z="${z}">`,
        mode,
        points.map(genPoint).join('\n'),
        `</fillprism>`
      ].join('\n');
    }
  }
}

/*
*** utils
 */
function genKV(key, value) {
  if (['', null, undefined].includes(value)) return '';
  return `${key}="${value}" `;
}

function genKVS(values, keys = ['x', 'y', 'z']) {
  return values.map((v, i) => genKV(keys[i], v)).join('');
}

function genPoint([x, y, z]) {
  return `<point x="${x}" y="${y}" z="${z}" />`;
}

function genCommon(m, index) {
  const {shapeMode, drawMode, isFluid} = m;
  return [
    `<setmkvoid />`,
    `<matrixreset />`,
    `<${isFluid ? 'setmkfluid' : 'setmkbound'} mk="${index}" />`,
    `<setdrawmode mode="${drawMode}" />`,
    `<setshapemode>${shapeMode.join(' | ')}</setshapemode>`
  ].join('\n');
}

function genTransform(m) {
  const {
    transform: {
      move,
      scale,
      rotate
    }
  } = m;
  const transform = [];
  if (move) {
    const [mx, my, mz] = move;
    transform.push(`<move x="${mx}" y="${my}" z="${mz}" />`);
  }
  if (scale) {
    const [sx, sy, sz] = scale;
    transform.push(`<scale x="${sx}" y="${sy}" z="${sz}" />`);
  }
  if (rotate) {
    const [rx, ry, rz, ang] = rotate;
    transform.push(`<rotate x="${rx}" y="${ry}" z="${rz}" ang="${ang}" />`);
  }
  return transform.join('\n');
}


export {
  genParams,
  genDefinition,
  genMkConfig,
  genConstants,
  genMainList,
  genInitials,
  genFloatings,
  genMotion,
  genWave
};
