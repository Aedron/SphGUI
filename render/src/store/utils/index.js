
import {
  genParams, genDefinition, genMkConfig,
  genConstants, genMainList, genInitials,
  genFloatings, genMotion, genWave
} from './gen';


const {remote} = window.require('electron');


function loadTemplate(name) {
  const template = remote.require(`./template/2d/${name}`);
  return JSON.parse(JSON.stringify(template));
}


function genXML(store) {
  const { mainList } = store;
  const constantsDef = genConstants(store.constants);
  const mkConfig = genMkConfig(store.mkConfig);
  const definition = genDefinition(store.container);
  const params = genParams(store.params);
  const mainlist = genMainList(mainList);
  const initials = genInitials(mainList);
  const floatings = genFloatings(mainList);
  const motion = genMotion(mainList);
  const wave = genWave(mainList);

  const xml = `
  <case>
    <casedef>
        ${constantsDef}
        ${mkConfig}
        <geometry>
            ${definition}
            <commands>${mainlist}</commands></geometry>
        <initials>${initials}</initials>
        <floatings>${floatings}</floatings>
        <motion>${motion}</motion>        
    </casedef>
    <execution>
        <special>
            <wavepaddles>${wave}</wavepaddles>
        </special>
        ${params}</execution></case>`;
  return '<?xml version="1.0" encoding="UTF-8" ?>\n' + formatXML(xml);
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
