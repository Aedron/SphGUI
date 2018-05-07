
const { spawn, exec } = require("child_process");
const electron = require("electron");

const env = "development";
let electronStarted = false;


const start = () => {
  electronStarted = true;

  exec('npm run render')
    .on("close", console.log.bind(console, 'render closed'));

  setTimeout(() => {
    spawn(electron, ["."], { stdio: "inherit" })
      .on("close", console.log.bind(console, 'main closed'));
  }, 1000);
};


start();
