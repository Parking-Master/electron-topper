# electron-topper
A simple Electron.js tool for creating and managing system notifications.

This package also provides custom timeout notifications (which isn't possible with the default API).

## Supported systems
- Mac
- Windows
- WSL
- Linux

## Quick start
Install the package with NPM:
```bash
npm install electron-topper
```

And to save it to your dependencies:
```bash
npm install electron-topper --save
```

And now import it into your project:
```javascript
const topper = require("electron-topper");
```

Now you are ready to use it!

## Examples
To send a system notification using electron-topper:
```javascript
topper.notify("This is the title", "This is the message");
```

To send a system notification with a custom icon:
```javascript
topper.notify("This is the title", "This is the message", "/path/to/icon.png");
```

Please also read the full [requirements]() for an icon in Electron notifications.

To send a system notification with a custom icon and custom close button:
```javascript
topper.notify("This is the title", "This is the message", "/path/to/icon.png", "Close notification");
```

To send a system notification with a custom timeout:
```javascript
// Timeout is in milliseconds (ms)
topper.timeout(3000, "This is the title", "This is the message");
```

To send an advanced notification:
```javascript
topper.notify({
  title: "This is the title",
  subtitle: "This is the subtitle",
  body: "This is the message",
  icon: "/path/to/icon.png",
  button: "Close notification",
  silent: false,
  options: {
    "Option 1": function() {
      console.log("Option 1 was chosen");
    },
    "Option 2": function() {
      console.log("Option 1 was chosen");
    }
  }
});
```

To dynamically close a specific notification:
```javascript
// Store the notification id
let notification = topper.notify("This is the title", "This is the message", "/path/to/icon.png", "Close notification");

// Somewhere else in your code
topper.close(notification);
```

To dynamically close all notifications:
```javascript
topper.closeAll();
```

## All methods
- ### `notify`: function notify(title | options: string | object, body: string, icon: string, button: string)
  - Sends a system notification. The "title" parameter can also be an object with advanced options.
  - __Supported systems__: Mac, Windows, Linux
  <br>
  └ param: `options`: { title: string, subtitle: string, body: string, icon: string, button: string, silent: boolean, options: object }
  <br>
  └ param: `options.options`: __Supported systems__: Mac

- ### `timeout`: function timeout(timeout: number, title | options: string | object, body: string, icon: string, button: string)
  - Sends a system notification with a timeout. Timeout is in milliseconds (ms). The "title" parameter can also be an object with advanced options.
  - __Supported systems__: Mac, Windows, Linux
  <br>
  └ param: `options`: { title: string, subtitle: string, body: string, icon: string, button: string, silent: boolean, options: object }

- ### `close`: function close(id: string)
  - Closes an opened notification.
  - __Supported systems__: Mac, Windows, Linux
  
- ### `closeAll`: function closeAll()
  - Closes all opened notifications.
  - __Supported systems__: Mac, Windows, Linux

## Shortcuts
All methods have a shortcut-function to minimize code. For example, `.notify` has the shortcut `.n`. Here are all of the shortcuts:
```javascript
topper.n(...) // Same as topper.notify()
topper.t(...) // Same as topper.timeout()
topper.c(...) // Same as topper.close()
topper.x(...) // Same as topper.closeAll()
```

# License
MIT
