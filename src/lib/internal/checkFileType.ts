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
        let response;
        let filePath;
        await Promise.all(
            this.vscode.workspace.textDocuments.map(async (file: any) => {
                const { languageId, fileName } = file;
                if (languageId === 'markdown') {
                    response = true;
                    filePath = fileName;
                }
            })
        );
        return { isMDFile: response, filePath };
    };
};
