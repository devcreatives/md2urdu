// This class is responsible for getting current editor file type

// CheckFileType Class
// Getting information of current open file if that file is markdown get content of file
module.exports = class CheckFileType {
    vscode: any;
    constructor(vscode: any) {
        this.vscode = vscode;
    }
    // this method is called for checking current open file
    checkFileType = async () => {
        const vscode = this.vscode;
        let response;
        let filePath;
        const { _documentData } = vscode.window.activeTextEditor;
        const { _languageId, _document } = _documentData;
        const { fileName } = _document;
        if (_languageId === 'markdown') {
            response = true;
            filePath = fileName;
        }
        return { isMDFile: response, filePath };
    };
};
