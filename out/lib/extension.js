"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.md2urdu', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World! Welcome to .md language converter to urdu');
        // Getting information of current open file if that file is markdown get content of file
        yield checkFileType();
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called for checking current open file
function checkFileType() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(vscode.workspace.textDocuments.map((file) => __awaiter(this, void 0, void 0, function* () {
            const { languageId, fileName } = file;
            if (languageId === 'markdown') {
                yield getFileContent(fileName);
            }
        })));
    });
}
// this method is called for getting content of current file
function getFileContent(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.readFile(fileName, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                const fileData = yield data.toString();
                google_translate_api_1.default(fileData, { to: 'ur' })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (!res)
                        throw Error('Unable to convert to urdu');
                    else {
                        const urduText = res.text;
                        yield fs.writeFile(fileName, urduText, err => {
                            if (err)
                                throw Error('Unable to convert to urdu');
                            vscode.window.showInformationMessage('.md Successfully Converted to urdu');
                        });
                    }
                }))
                    .catch((err) => {
                    throw Error('Unable to convert to urdu');
                });
            }
            else
                throw Error('Unable to convert to urdu');
        }));
    });
}
// this method is called when your extension is deactivated
function deactivate() {
    vscode.window.showInformationMessage('md2urdu is deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map