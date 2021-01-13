// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');
const translate = require('@vitalets/google-translate-api');
const CheckFileType = require('./internal/checkFileType');
const GetFileContent = require('./internal/getFileContent');
const WriteFileContent = require('./internal/writeFileContent');
const Translate = require('./internal/translate');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'extension.md2urdu',
        async () => {
            // The code you place here will be executed every time your command is executed
            const fileTypeResult = new CheckFileType(vscode);
            const { checkFileType } = fileTypeResult;
            const { isMDFile, filePath } = await checkFileType();
            if (isMDFile) {
                vscode.window.showInformationMessage(
                    'Converting MD File To Urdu'
                );
                const getFileContentResult = new GetFileContent(vscode, fs);
                const { getFileContent } = getFileContentResult;
                const { fileData, selectedTexted } = await getFileContent(
                    filePath
                );
                if (fileData && !selectedTexted) {
                    const translateResult = new Translate(translate, vscode);
                    const { translation } = translateResult;
                    const fileDataInUrdu = await translation(fileData);
                    if (fileDataInUrdu) {
                        const writeFileContentResult = new WriteFileContent(
                            vscode,
                            fs
                        );
                        const { writeFileContent } = writeFileContentResult;
                        const writeData = await writeFileContent(
                            filePath,
                            fileDataInUrdu
                        );
                        if (writeData) {
                            vscode.window.showInformationMessage(
                                'Successfully Converted MD File To Urdu'
                            );
                        } else {
                            vscode.window.showInformationMessage(
                                'Unable To Write Urdu Data In MD File'
                            );
                        }
                    } else {
                        vscode.window.showInformationMessage(
                            'Unable To Translate MD File Data'
                        );
                    }
                } else if (fileData && selectedTexted) {
                    const translateResult = new Translate(translate, vscode);
                    const { translation } = translateResult;
                    const selectedTextInUrdu = await translation(
                        selectedTexted
                    );
                    if (selectedTextInUrdu) {
                        const fileDataWithSelectedText = fileData.replace(
                            selectedTexted,
                            selectedTextInUrdu
                        );
                        const writeFileContentResult = new WriteFileContent(
                            vscode,
                            fs
                        );
                        const { writeFileContent } = writeFileContentResult;
                        const writeData = await writeFileContent(
                            filePath,
                            fileDataWithSelectedText
                        );
                        //Used variables instead of re writing the event again and again it self.
                        let showInformationMessage = '';
                        if (writeData) {
                            showInformationMessage =
                                'Successfully Converted MD File To Urdu';
                        } else {
                            showInformationMessage =
                                'Unable To Write Urdu Data In MD File';
                        }
                        vscode.window.showInformationMessage(
                            showInformationMessage
                        );
                    } else {
                        vscode.window.showInformationMessage(
                            'Unable To Translate MD File Data'
                        );
                    }
                } else {
                    vscode.window.showInformationMessage(
                        'Unable To Get MD File Data'
                    );
                }
            } else {
                vscode.window.showInformationMessage(
                    'Current File Is Not MD File'
                );
            }
        }
    );
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    vscode.window.showInformationMessage('md2urdu is deactivated');
}
