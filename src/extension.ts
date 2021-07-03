import * as vscode from 'vscode';

export function activate({ subscriptions }: vscode.ExtensionContext) {
  let NEXT_TERM_ID = 1;

  const singleWatch = vscode.commands.registerCommand('jestcontextmenurunner.singleWatch', (uri: vscode.Uri) => {
    vscode.window.showInformationMessage(`Running tests in watch mode for ${getFileName(uri)} file.`);
    executeCommandInTerminal(NEXT_TERM_ID++, `--watch ${uri.fsPath}`);
  });

  const single = vscode.commands.registerCommand('jestcontextmenurunner.single', (uri: vscode.Uri) => {
    vscode.window.showInformationMessage(`Running tests for ${getFileName(uri)} file.`);
    executeCommandInTerminal(NEXT_TERM_ID++, uri.fsPath);
  });

  const all = vscode.commands.registerCommand('jestcontextmenurunner.all', () => {
    vscode.window.showInformationMessage('Running all tests.');
    executeCommandInTerminal(NEXT_TERM_ID++);
  });

  const allWatch = vscode.commands.registerCommand('jestcontextmenurunner.allWatch', () => {
    vscode.window.showInformationMessage('Running all tests in watch mode.');
    executeCommandInTerminal(NEXT_TERM_ID++, '--watch');
  });

  subscriptions.push(singleWatch);
  subscriptions.push(single);
  subscriptions.push(all);
  subscriptions.push(allWatch);
}

function getFileName(uri: vscode.Uri): string {
  const searchResult = /^.+(\\|\/)(?<fileName>([^\\\/\n]+)(\.)?[^\n\.]+)$/.exec(uri.fsPath);
  return searchResult?.groups?.fileName || '';
}

function executeCommandInTerminal(id: number, cmd = ''): void {
  const terminal = vscode.window.createTerminal(`Ext Terminal #${id}`);
  terminal.show(true);
  terminal.sendText(`npm run env -- jest --color ${cmd}`);
}