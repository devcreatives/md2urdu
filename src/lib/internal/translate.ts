// This class is responsible for translations

module.exports = class Translate {
    translate: any;
    vscode: any;
    constructor(translate: any, vscode: any) {
        this.translate = translate;
        this.vscode = vscode;
    }
    // this method will translate string
    translation = async (fileData: string) => {
        return await this.translate(fileData, { to: 'ur' })
            .then((res: any) => {
                if (!res)
                    this.vscode.window.showInformationMessage(
                        'Unable to convert'
                    );
                else {
                    const urduText = res.text;
                    return urduText;
                }
            })
            .catch((err: object) => {
                this.vscode.window.showInformationMessage('Unable to convert');
                return err;
            });
    };
};
