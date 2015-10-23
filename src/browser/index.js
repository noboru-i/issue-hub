/*global __dirname*/
import app from 'app';
import BrowserWindow from 'browser-window';

let listWindow = null;
let editorWindows = [];

let issues = {};

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  listWindow = new BrowserWindow({width: 800, height: 600});
  listWindow.loadUrl(`file://${__dirname}/../list/index.html`);

  // TODO only debug
  listWindow.openDevTools();

  listWindow.on('closed', () => {
    listWindow = null;
  });
});

export function openEditor(issue) {
  console.log('openEditor');
  let editorWindow = new BrowserWindow({width: 800, height: 600});
  issues[issue.id] = issue;
  editorWindow.loadUrl(`file://${__dirname}/../editor/index.html?issue_id=${issue.id}`);

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

export function getIssueFromId(issueId) {
  return issues[issueId];
}
