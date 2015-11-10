/*global global*/
/*global __dirname*/
import app from 'app';
import BrowserWindow from 'browser-window';
import Menu from 'menu';
import dialog from 'dialog';

import ApplicationData from './libraries/application-data';
import githubAuthUtil from './command-models/github-auth-util';

let authWindow = null;
let listWindow = null;
let editorWindows = [];

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  global.applicationData = new ApplicationData();
  openAuth();

  var template = [
    {
      label: 'Application',
      submenu: [
          { label: 'About Application', role: 'about' },
          { type: 'separator' },
          { label: 'Logout from GitHub', click: logout },
          { label: 'Quit', accelerator: 'Cmd+Q', click: () => { app.quit(); }}
      ]
    },
    {
      label: 'Edit',
      submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
          { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
          { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
      ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});

export function openAuth() {
  authWindow = new BrowserWindow({width: 800, height: 600, show: false, 'node-integration': false});
  authWindow.loadUrl(githubAuthUtil.getAuthUrl());
  authWindow.show();

  const callback = (url) => {
    githubAuthUtil.checkUrl(url, (err, accessToken) => {
      if (err) {
        console.log(err);
        return;
      }
      global.applicationData.githubAccessToken = accessToken;
      openList();

      authWindow.close();
    });
  };
  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    console.log('did-get-redirect-request');
    console.log(`newUrl=${newUrl}`);
    // auto login by cookie
    callback(newUrl);
  });

  authWindow.webContents.on('will-navigate', (event, url) => {
    // click authorize button
    console.log('will-navigate');
    callback(url);
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
}

export function openList() {
  listWindow = new BrowserWindow({width: 800, height: 600});
  listWindow.loadUrl(`file://${__dirname}/../list/index.html`);

  // TODO only debug
  listWindow.openDevTools();

  listWindow.on('closed', () => {
    listWindow = null;
  });
}

export function openEditor(issueId) {
  let editorWindow = new BrowserWindow({width: 800, height: 600});
  editorWindow.loadUrl(`file://${__dirname}/../editor/index.html?issue_id=${issueId}`);

  // TODO only debug
  editorWindow.openDevTools();

  editorWindow.on('closed', () => {
    let index = editorWindows.findIndex((target) => {
      return target == editorWindow;
    });
    if (index == -1) {
      console.log('error');
    }
    // remove reference
    editorWindows.splice(index, 1);
    editorWindow = null;
  });

  editorWindows.push(editorWindow);
}

function logout() {
  const dummyWindow = new BrowserWindow({ width: 800, height: 600, show: false });

  dummyWindow.webContents.session.cookies.get({}, (error, cookies) => {
    if (error) {
      throw error;
    }
    cookies.forEach((cookie) => {
      removeCookie(dummyWindow, cookie);
    });
  });

  dialog.showMessageBox(
    {
      message: 'logout completed!\nPlease re-open Issue Hub',
      buttons: ['ok']
    },
    () => {
      app.quit();
    }
  );
}

function removeCookie(dummyWindow, cookie) {
  const url = 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
  dummyWindow.webContents.session.cookies.remove(
    {
      'url': url,
      'name': cookie.name
    },
    (error) => {
      if (error) {
        throw error;
      }
    });
}
