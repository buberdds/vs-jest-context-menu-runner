import { commands, window, ExtensionContext, Uri } from 'vscode';
import { escapeRegExpForPath, normalizePath, quote } from './util';

export function activate({ subscriptions }: ExtensionContext) {
  let NEXT_TERM_ID = 1;

  const singleWatch = commands.registerCommand(
    'jestcontextmenurunner.singleWatch',
    (uri: Uri) => {
      window.showInformationMessage(
        `Running tests in watch mode for ${getFileName(uri)} file.`
      );
      executeCommandInTerminal(NEXT_TERM_ID++, `--watch ${uri.fsPath}`);
    }
  );

  const single = commands.registerCommand(
    'jestcontextmenurunner.single',
    (uri: Uri) => {
      window.showInformationMessage(
        `Running tests for ${getFileName(uri)} file.`
      );
      executeCommandInTerminal(NEXT_TERM_ID++, uri.fsPath);
    }
  );

  const all = commands.registerCommand('jestcontextmenurunner.all', () => {
    window.showInformationMessage('Running all tests.');
    executeCommandInTerminal(NEXT_TERM_ID++);
  });

  const allWatch = commands.registerCommand(
    'jestcontextmenurunner.allWatch',
    () => {
      window.showInformationMessage('Running all tests in watch mode.');
      executeCommandInTerminal(NEXT_TERM_ID++, '--watch');
    }
  );

  subscriptions.push(singleWatch);
  subscriptions.push(single);
  subscriptions.push(all);
  subscriptions.push(allWatch);
}

function getFileName(uri: Uri): string {
  const searchResult = /^.+(\\|\/)(?<fileName>([^\\\/\n]+)(\.)?[^\n\.]+)$/.exec(
    uri.fsPath
  );
  return searchResult?.groups?.fileName || '';
}

function executeCommandInTerminal(id: number, cmd = ''): void {
  const terminal = window.createTerminal(`Ext Terminal #${id}`);
  const escapedFilePath = quote(escapeRegExpForPath(normalizePath(cmd)));
  terminal.show(true);
  terminal.sendText(`npm run env -- jest --color ${escapedFilePath}`);
}
