const { app, BrowserWindow, Tray, Menu, ipcMain, Notification, nativeImage } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let tray;
const APP_ID = 'com.agentwallboard.desktop'; // change for your org

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 640,
    show: false,
    resizable: isDev,
    icon: path.join(__dirname, 'public/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // sandbox: true, // enable later if needed in your environment
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'build/index.html')}`;

  mainWindow.loadURL(startUrl);

  mainWindow.on('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = null; });

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.removeMenu();
  }

  // helpful debug hooks
  mainWindow.webContents.on('did-fail-load', (_e, code, desc, url) => {
    console.error('did-fail-load', { code, desc, url });
  });
  mainWindow.webContents.on('console-message', (_e, level, message, line, sourceId) => {
    console.log('renderer console:', { level, message, line, sourceId });
  });
}

function createTray() {
  const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'public/assets/tray-icon.png'));
  tray = new Tray(trayIcon);

  const sendStatus = (status) => {
    if (mainWindow) {
      mainWindow.webContents.send('tray-status', status);
      mainWindow.show();
    }
  };

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Available', click: () => sendStatus('Available') },
    { label: 'Busy', click: () => sendStatus('Busy') },
    { label: 'Break', click: () => sendStatus('Break') },
    { type: 'separator' },
    { label: 'Show App', click: () => mainWindow?.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Agent Wallboard');
  tray.on('double-click', () => mainWindow?.show());
}

function registerIpc() {
  ipcMain.handle('show-notification', (_e, args = {}) => {
    const { title = 'Notification', body = '' } = args;
    if (process.platform === 'win32') app.setAppUserModelId(APP_ID);
    const n = new Notification({ title, body });
    n.show();
    return { ok: true };
  });

  ipcMain.handle('close-app', () => {
    app.quit();
    return { ok: true };
  });

  ipcMain.handle('get-version', () => app.getVersion());
}

// single instance
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    app.setAppUserModelId(APP_ID);
    createWindow();
    createTray();
    registerIpc();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
