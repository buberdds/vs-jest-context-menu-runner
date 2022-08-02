import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Registered commands', async () => {
    const extention = vscode.extensions.getExtension(
      'modifiz.jestcontextmenurunner'
    )!;
    await extention.activate();
    const commands = await vscode.commands.getCommands();

    assert.ok(commands.includes('jestcontextmenurunner.singleWatch'));
    assert.ok(commands.includes('jestcontextmenurunner.single'));
    assert.ok(commands.includes('jestcontextmenurunner.allWatch'));
    assert.ok(commands.includes('jestcontextmenurunner.all'));
  });
});
