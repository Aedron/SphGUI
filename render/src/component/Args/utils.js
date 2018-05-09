
import { data } from '../../utils';


const { remote } = window.require('electron');
const { dialog } = remote.require('electron');
const { fileTypes, fileTypeMap } = data;



function importFile() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      title: '导入外部模型',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: '外部模型', extensions: fileTypes }
      ]
    }, resolve);
  })
}

function loadTemplate(name) {
  const template = remote.require(`./template/2d/${name}`);
  return JSON.parse(JSON.stringify(template));
}


function genXML(state) {
  const constantsDef = genConstants(state.constants);
  const mkConfig = genMkConfig(state.mkConfig);
  const definition = genDefinition(state.container);

  const xml = `
  <case>
    <casedef>
        ${constantsDef}
        ${mkConfig}
        <geometry>
            ${definition}
        </geometry>
    </casedef>
    <execution>
    
    </execution>
  </case>
  `;
  return '<?xml version="1.0" encoding="UTF-8" ?>\n' + formatXml(xml);
}

function genDefinition(definition) {
  const { dp, min, max } = definition;
  return `<definition dp="${dp}" units_comment="metres (m)">
    <pointmin x="${min[0]}" y="${min[1]}" z="${min[2]}" />
    <pointmax x="${max[0]}" y="${max[1]}" z="${max[2]}" />
</definition>`
}

function genMkConfig(mkConfig) {
  const { boundCount, fluidCount } = mkConfig;
  return `<mkconfig boundcount="${boundCount}" fluidcount="${fluidCount}" />`
}

function genConstants(constants) {
  const v = constants.map((i) => {
    let { name, value, displayName, unit } = i;
    value = (Array.isArray(value) ? value : [['value', value]])
      .map(([k, v]) => genKV(k, v)).join(' ');
    displayName = genKV('comment', displayName);
    unit = genKV('units_comment', unit);
    return `<${name} ${value} ${displayName}${unit}/>`
  }).join('');
  return `<constantsdef>${v}</constantsdef>`
}

function genKV(key, value) {
  if (['', null, undefined].includes(value)) return '';
  return `${key}="${value}" `;
}


function formatXml(xml) {
  const PADDING = ' '.repeat(4);
  const reg = /(>)(<)(\/*)/g;
  let pad = 0;

  xml = xml.replace(reg, '$1\r\n$2$3');

  return xml.split('\r\n').map((node, index) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/) && pad > 0) {
      pad -= 1;
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    pad += indent;

    return PADDING.repeat(pad - indent) + node;
  }).join('\r\n');
}



export {
  loadTemplate,
  genXML,
  importFile
}
