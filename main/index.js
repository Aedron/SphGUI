
const { app, Menu } = require("electron");
const path = require('path');
const url = require('path');
const env = require("env");

const devMenuTemplate = require("./menu/dev_menu_template");
const editMenuTemplate = require("./menu/edit_menu_template");
const createWindow = require("./utils/window");


const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};


if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}


app.on("ready", () => {
  setApplicationMenu();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600
  });

  mainWindow.loadURL(
    'http://localhost:3006/'
    // url.format({
    //   pathname: path.join(__dirname, "app.html"),
    //   protocol: "file:",
    //   slashes: true
    // })
  );

  if (env.name === "development") {
    mainWindow.openDevTools();
  }
});


app.on("window-all-closed", () => {
  app.quit();
});
