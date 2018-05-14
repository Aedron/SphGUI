
module.exports = (window) => ({
  label: "Edit",
  submenu: [
    {
      label: "保存",
      accelerator: "CmdOrCtrl+S",
      click: () => window.webContents.send('run', 'save')
    },
    {
      label: "执行",
      accelerator: "CmdOrCtrl+E",
      click: () => window.webContents.send('run', 'exec')
    },
    { type: "separator" },
    { label: "撤销", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    { label: "反撤销", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    { type: "separator" },
    { label: "剪切", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    { label: "复制", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    { label: "粘贴", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    { label: "全选", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]
});

