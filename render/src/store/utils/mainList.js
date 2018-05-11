
function getMainList(mainlist) {
  const m = mainlist.map((m, index) => {
    const { type } = m;
    const common = genCommon(m, index);
    const transform = genTransform(m, index);
    let genCommand;
    switch (type) {
      case 'line': genCommand = genLine; break;
      case 'triangles': genCommand = genTriangles; break;
      case 'quadri': genCommand = genQuadri; break;
      case 'strip': genCommand = genStrip; break;
      case 'pyramid': genCommand = genPyramid; break;
      case 'prism': genCommand = genPrism; break;
      case 'box': genCommand = genBox; break;
      case 'sphere': genCommand = genSphere; break;
      case 'cylinder': genCommand = genCylinder; break;
      case 'beach': genCommand = genBeach; break;
      default: genCommand = () => ""; break;
    }
    const command = genCommand(m, index);
    return `<!--Draw ${type}--/>\n${common}\n${transform}\n${command}`
  }).join('\n');
  return `<mainlist>${m}</mainlist>`
}

// triangle
function genTriangles(triangle) {
  const { points } = triangle;
  return [
    `<drawtriangle>`,
    points.map(genPoint).join('\n'),
    `</drawtriangle>`
  ].join('\n');
}
function genQuadri(quadri) {
  const { points } = quadri;
  return [
    `<drawquadri>`,
    points.map(genPoint).join('\n'),
    `</drawquadri>`
  ].join('\n');
}
function genStrip(strip) {
  const { points } = strip;
  return [
    `<drawtrianglesstrip>`,
    points.map(genPoint).join('\n'),
    `</drawtrianglesstrip>`
  ].join('\n');
}

// pyramid
function genPyramid(pyramid) {
  const { points } = pyramid;
  return [
    `<drawpyramid>`,
    points.map(genPoint).join('\n'),
    `</drawpyramid>`
  ].join('\n');
}

// prism
function genPrism(prism) {
  const { points } = prism;
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
  const { point, radius } = sphere;
  return [
    `<drawsphere radius="${radius}">`,
    genPoint(point),
    `</drawsphere>`
  ].join('\n');
}

// cylinder
function genCylinder(cylinder) {
  const { points, radius } = cylinder;
  return [
    `<drawsphere radius="${radius}">`,
    points.map(genPoint).join('\n'),
    `</drawsphere>`
  ].join('\n');
}

// beach
function genBeach(beach) {
  const { points } = beach;
  return [
    `<drawbeach>`,
    points.map(genPoint).join('\n'),
    `</drawsphere>`
  ].join('\n');
}

// line
function genLine(line) {
  const { points } = line;
  return [
    `<drawline>`,
    points
      .map(([x, y, z]) => `<point x="${x}" y="${y}" z="${z}" />`)
      .join('\n'),
    `</drawline>`
  ].join('\n');
}

// utils
function genPoint([x, y, z]) {
  return `<point x="${x}" y="${y}" z="${z}" />`;
}
function genCommon(m, index) {
  const { shapeMode, drawMode, isFluid } = m;
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


export default getMainList;
