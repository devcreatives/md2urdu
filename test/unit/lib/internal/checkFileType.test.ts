// This will test type of current file
const checkFileTypeImport = require('./import')

test('checking file type in editor', async () => {
    const { CheckFileType, vscode } = checkFileTypeImport
    const { currentWorkSpace } = vscode
    const fileTypeResult = new CheckFileType(currentWorkSpace)
    const { checkFileType } = fileTypeResult
    const response = await checkFileType()
    expect(response).toBe(true)
})
