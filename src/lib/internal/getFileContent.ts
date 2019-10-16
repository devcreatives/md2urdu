// This class is responsible for getting file content

module.exports = class GetFileContent {
    vscode: any;
    fs: any;
    constructor(vscode: any, fs: any) {
        this.vscode = vscode;
        this.fs = fs;
    }
    // this method is called for getting content of current file
    getFileContent = async (fileName: string) => {
        const fs = this.fs;
        const vscode = this.vscode;
        return new Promise(function(resolve: any, reject: any) {
            fs.readFile(fileName, async (err: any, data: any) => {
                if (!err) {
                    const selectedTexted = vscode.window.activeTextEditor.document.getText(
                        vscode.window.activeTextEditor.selection
                    );
                    const fileData = await data.toString();
                    resolve({ fileData, selectedTexted });
                } else {
                    vscode.window.showInformationMessage(
                        '.md Not Converted to urdu'
                    );
                    reject(undefined);
                }
            });
        });
    };
};
