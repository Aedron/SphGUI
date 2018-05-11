
import { toJS } from 'mobx';
import getMainList from './mainList';


const {remote} = window.require('electron');


function loadTemplate(name) {
  const template = remote.require(`./template/2d/${name}`);
  return JSON.parse(JSON.stringify(template));
}


function genXML(store) {
  const constantsDef = genConstants(store.constants);
  const mkConfig = genMkConfig(store.mkConfig);
  const definition = genDefinition(store.container);
  const params = getParams(store.params);
  const mainList = getMainList(store.mainList);

  const xml = `
  <case>
    <casedef>
        ${constantsDef}
        ${mkConfig}
        <geometry>
            ${definition}
            <commands>${mainList}</commands></geometry>
    </casedef>
    <execution>${params}</execution></case>`;
  return '<?xml version="1.0" encoding="UTF-8" ?>\n' + formatXML(xml);
}

function getParams(params) {
  const p = params.map(p => {
    const { name, value, disable, unit } = p;
    const k = disable ? `#${name}` : name;
    return `<parameter ${genKV('key', k)}${genKV('value', value)}${genKV('units_comment', unit)}/>`
  }).join('\n');
  return `<parameters>${p}</parameters>`
}

function genDefinition(definition) {
  const {dp, min, max} = definition;
  return [
    `<definition dp="${dp}" units_comment="metres (m)">`,
    `<pointmin x="${min[0]}" y="${min[1]}" z="${min[2]}" />`,
    `<pointmax x="${max[0]}" y="${max[1]}" z="${max[2]}" />`,
    `</definition>`
  ].join('\n')
}

function genMkConfig(mkConfig) {
  const {boundCount, fluidCount} = mkConfig;
  return `<mkconfig boundcount="${boundCount}" fluidcount="${fluidCount}" />\n`
}

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

function genKV(key, value) {
  if (['', null, undefined].includes(value)) return '';
  return `${key}="${value}" `;
}


function formatXML(input, indent) {
  indent = indent || '\t';
  let xmlString = input
    .replace(/^\s*$(?:\r\n?|\n)/gm, '')
    .replace(/^\s+|\s+$/g, '')
    .replace(/(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[\w\s])/g, "$1\n")
    .replace(/(<\/[a-zA-Z]+[^>]*>)/g, "$1\n")
    .replace(/>\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<")
    .replace(/>(.+?)<([a-zA-Z])/g, ">\n$1\n<$2")
    .replace(/\?></, "?>\n<");
  let xmlArr = xmlString.split('\n');

  let tabs = '';
  let start = 0;

  if (/^<[?]xml/.test(xmlArr[0])) start++;

  for (let i = start; i < xmlArr.length; i++) {
    const line = xmlArr[i].replace(/^\s+|\s+$/g, '');

    if (/^<[/]/.test(line)) {
      tabs = tabs.replace(indent, '');
      xmlArr[i] = tabs + line;
    } else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line)) {
      xmlArr[i] = tabs + line;
    } else if (/<.*>/.test(line)) {
      xmlArr[i] = tabs + line;
      tabs += indent;
    } else {
      xmlArr[i] = tabs + line;
    }
  }

  return xmlArr.join('\n');  //rejoin t
}


export {
  loadTemplate,
  genXML
}
