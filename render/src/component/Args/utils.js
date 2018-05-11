
import { data } from '../../utils';


const { remote } = window.require('electron');
const { dialog } = remote.require('electron');
const { fileTypes } = data;



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

export {
  importFile
}
