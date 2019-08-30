// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";

// Current Editor
const editor = vscode.window.activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.textrtl",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World! Welcome to text rtl");
      // Getting information of current open file if that file is markdown get content of file
      await checkFileType();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called for checking current open file
async function checkFileType() {
  await Promise.all(
    vscode.workspace.textDocuments.map(async file => {
      const { languageId, fileName } = file;
      if (languageId === "markdown") {
        await getFileContent(fileName);
      }
    })
  );
}

// this method is called for getting content of current file
async function getFileContent(fileName) {
  await fs.readFile(fileName, async (err, data) => {
    const fileData = await data.toString();
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
