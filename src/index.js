const { app, BrowserWindow, ipcMain } = require('electron');
const electron = require('electron')
const path = require('path');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
var fs = require('fs');

var dir = userDataPath + '/list';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, //allow the use of node modules outside of only the main process. This shouldn't create vulnerabilities unless you're dumb with it.
      contextIsolation: false, //needed to allow node integration
      enableRemoteModule: true
    }
  });
  const openWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true, //allow the use of node modules outside of only the main process. This shouldn't create vulnerabilities unless you're dumb with it.
      contextIsolation: false, //needed to allow node integration
      enableRemoteModule: true
    },
    show: false
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  openWindow.loadFile(path.join(__dirname, 'open.html'))
  

  ipcMain.on('show-open-window', (event, arg) => {
    openWindow.reload();
    openWindow.show();
  });

  ipcMain.on('request-update-label-in-main-window', (event, arg) => {
    openWindow.hide();
    mainWindow.webContents.send('action-update-label', arg);
  });
  mainWindow.on('closed', () => app.quit());
  openWindow.on('closed', () => app.quit());
};

//calls createWindow when the app is launched, most things need to be called after this point to avoid conflictions.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// compatability for OS X
// recreates a window in teh app when the dock icon is clicked
// if no other windows are open in the program
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Main process code goes here, includes the likes of listeners and communicating to the renderer process
