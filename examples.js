const { app, BrowserWindow } = require("electron");
const topper = require("./index.js");

app.on("ready", () => {
  // Example of sending a notification
  topper.notify("Title of notification", "A little description of the notification", "/path/to/icon.png");

  // Example of sending a notification with a close button
  topper.notify("Title of notification", "A little description of the notification", "/path/to/icon.png", "Close");

  // Example of sending a timeout notification
  topper.timeout(5000, "Title of notification", "A little description of the notification", "/path/to/icon.png", "Close");

  // Example of closing a notification
  let notification = topper.notify("Title of notification", "A little description of the notification", "/path/to/icon.png", "Close");
  topper.close(notification);

  // Example of closing all notifications
  topper.notify("Title of notification", "A little description of the notification", "/path/to/icon.png", "Close");
  topper.notify("Foo bar", "Lorem ipsum", "/path/to/icon.png", "Close");
  topper.closeAll();

  // Example of sending a dropdown of options (only supported on Mac)
  topper.notify({
    title: "Title of notification",
    body: "A little description of the notification",
    icon: "/path/to/icon.png",
    options: {
      "Option 1": function() {
        console.log("Option 1 was chosen");
      },
      "Option 2": function() {
        console.log("Option 2 was chosen");
      },
      "Option 3": function() {
        console.log("Option 3 was chosen");
      },
    }
  });

  // Function shortcuts
  topper.n(); // Shortcut for `topper.notify()`
  topper.t(); // Shortcut for `topper.timeout()`
  topper.c(); // Shortcut for `topper.close()`
  topper.x(); // Shortcut for `topper.closeAll()`
});