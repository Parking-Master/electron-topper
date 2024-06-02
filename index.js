const { Notification, nativeImage } = require("electron");

const topper = {
  logger: {
    info: function(message) {
      message = "electron-topper: " + message.trim();
      console.log(message);
    },
    error: function(message) {
      message = "Error: electron-topper: " + message.trim();
      console.log("\x1b[31m" + message + "\x1b[0m");
    },
    warn: function(message) {
      message = "Warning: electron-topper: " + message.trim();
      console.log("\x1b[33m" + message + "\x1b[0m");
    }
  },
  notifications: {},
  ready: false,
  init: async function() {
    return new Promise(function(resolve) {
      resolve();
    });
  },
  notify: function(title, body, iconPath, button) {
    if (!topper.ready) topper.init();
    try {
      let notificationId = Math.random().toString().slice(2, 6);
      if (typeof title === "object") {
        let options = title;
        if (!((options.title ? typeof options.title === "string" : true) && (options.body ? typeof options.body === "string" : true) && (options.icon ? typeof options.icon === "string" : true) && (options.subtitle ? typeof options.subtitle === "string" : true) && ((options.silent !== null && options.silent !== undefined) ? typeof options.silent === "boolean" : true) && (options.button ? typeof options.button === "string" : true) && (options.options ? typeof options.options === "object" : true))) {
          let parameter = null;
          if (!(options.title ? typeof options.title === "string" : true)) parameter = ["title", "string"];
          if (!(options.body ? typeof options.body === "string" : true)) parameter = ["body", "string"];
          if (!(options.icon ? typeof options.icon === "string" : true)) parameter = ["icon", "string"];
          if (!(options.subtitle ? typeof options.subtitle === "string" : true)) parameter = ["subtitle", "string"];
          if (!((options.silent !== null && options.silent !== undefined) ? typeof options.silent === "boolean" : true)) parameter = ["silent", "boolean"];
          if (!(options.button ? typeof options.button === "string" : true)) parameter = ["button", "string"];
          if (!(options.options ? typeof options.options === "object" : true)) parameter = ["options", "object"];

          return topper.logger.error("Invalid data type for '" + parameter[0] + "' parameter. Should be type '" + parameter[1] + "' but instead received type '" + (typeof options[parameter[0]]) + "'");
        }

        let optionButtons = Object.keys(options.options);
        let optionsObject = optionButtons.map(x => { return { type: "button", text: x } });

        let icon = process.platform === "darwin" ? (options.iconPath ? nativeImage.createFromPath(options.iconPath) : null) : options.iconPath;
        let notification = new Notification({
          title: options.title,
          body: options.body,
          icon: icon,
          subtitle: options.subtitle,
          silent: options.silent,
          actions: optionsObject,
          timeoutType: "never",
          closeButtonText: options.button || null
        });
        notification.show();

        if (options.timeout) setTimeout(() => {
          notification.close();
        }, options.timeout);

        notification.addListener("action", function(event, index) {
          let functions = Object.values(options.options);
          functions[index]();
        });
        topper.notifications[notificationId] = notification;
        return notificationId;
      } else {
        let icon = process.platform === "darwin" ? (iconPath ? nativeImage.createFromPath(iconPath) : null) : iconPath;
        let notification = new Notification({
          title: title,
          body: body,
          icon: icon,
          timeoutType: "never",
          closeButtonText: button || null
        });
        notification.show();

        let timeout = arguments[4] || arguments[3];
        if (timeout && typeof timeout === "number") setTimeout(() => {
          notification.close();
        }, timeout);
        topper.notifications[notificationId] = notification;
        return notificationId;
      }
    } catch (err) {
      return null;
    }
  },
  timeout: function(...args) {
    if (typeof args[1] === "object") {
      args[1].timeout = args[0];
      let newArgs = args.splice(1);
      return topper.notify(...newArgs);
    } else {
      let newArgs = args.splice(1);
      return topper.notify(...newArgs, args[0]);
    }
  },
  close: function(notificationId) {
    topper.notifications[notificationId].close();
  },
  closeAll: function() {
    Object.values(topper.notifications).forEach(n => n.close());
  },
  n: function(...args) {
    return topper.notify(...args);
  },
  t: function(...args) {
    return topper.timeout(...args);
  },
  c: function(...args) {
    return topper.close(...args);
  },
  x: function() {
    return topper.closeAll();
  }
};

module.exports = topper;