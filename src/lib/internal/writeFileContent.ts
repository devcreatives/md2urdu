// This class is responsible for writting file content

module.exports = class WriteFileContent {
    vscode: any;
    fs: any;
    constructor(vscode: any, fs: any) {
        this.vscode = vscode;
        this.fs = fs;
    }
    // this method is called for writting content of current file
    writeFileContent = async (fileName: string, urduText: String) => {
        const fs = this.fs;
        const vscode = this.vscode;
        return new Promise(function(resolve: any, reject: any) {
            fs.writeFile(fileName, urduText, (err: any) => {
                if (err) reject(undefined);
                resolve(urduText);
            });
        });
    };
};
