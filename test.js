const { app, BrowserWindow } = require("electron");
const topper = require("./index.js");

app.on("ready", () => {
  topper.notify("Title of notification", "A little description of the notification", "/Users/Jackson/fps2d/icon.png", "button");
});