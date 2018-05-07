
const { remote } = window.require('electron');



function loadTemplate(name) {
  const template = remote.require(`./template/2d/${name}`);
  return JSON.parse(JSON.stringify(template));
}



export {
  loadTemplate
}
