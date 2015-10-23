/*global __dirname*/
import app from 'app';
import BrowserWindow from 'browser-window';

var mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl(`file://${__dirname}/../list/index.html`);

  // Open the DevTools.
  // TODO only debug
  mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
