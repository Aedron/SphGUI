
const { app, Menu } = require("electron");
const path = require('path');
const url = require('url');
const env = require("env");
const chokidar = require('chokidar');


const devMenuTemplate = require("./menu/dev_menu_template");
const editMenuTemplate = require("./menu/edit_menu_template");
const createWindow = require("./utils/window");


const setApplicationMenu = (mainWindow) => {
  const menus = [editMenuTemplate(mainWindow)];
  if (env.name !== "production") {
    menus.push(devMenuTemplate(mainWindow));
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};


if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}


app.on("ready", () => {
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600
  });

  mainWindow.loadURL(
    // 'http://localhost:3006/'
    `file://${path.join(app.getAppPath(), "./render/build/index.html")}`
  );
  mainWindow.on('close', () => {
    mainWindow.webContents.send('exit');
  });

  if (env.name === "development") {
    mainWindow.openDevTools();
  }

  setApplicationMenu(mainWindow);
});


app.on("window-all-closed", () => {
  app.quit();
});

module.exports = {
  app,
  chokidar
};
