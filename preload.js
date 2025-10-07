const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
showNotification: (title, body) => ipcRenderer.invoke('show-notification', { title, body }),
closeApp: () => ipcRenderer.invoke('close-app'),
getVersion: () => ipcRenderer.invoke('get-version'),
onTrayStatus: (handler) => ipcRenderer.on('tray-status', (_e, status) => handler(status)),
});