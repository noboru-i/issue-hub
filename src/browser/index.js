/*global __dirname*/
import app from 'app';
import BrowserWindow from 'browser-window';

import githubAuthUtil from './command-models/github-auth-util';

let authWindow = null;
let listWindow = null;
let editorWindows = [];

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  authWindow = new BrowserWindow({width: 800, height: 600, show: false, 'node-integration': false});
  authWindow.loadUrl(githubAuthUtil.getAuthUrl());
  console.log(githubAuthUtil.getAuthUrl());
  authWindow.show();

  // TODO only debug
  authWindow.openDevTools();

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    console.log('did-get-redirect-request');
    console.log(`newUrl=${newUrl}`);
    // auto login by cookie
    githubAuthUtil.checkUrl(newUrl, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      openList();

      authWindow.close();
    });
  });

  authWindow.webContents.on('will-navigate', (event, url) => {
    // click authorize button
    console.log('will-navigate');
    githubAuthUtil.checkUrl(url, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      openList();

      authWindow.close();
    });
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
});

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
