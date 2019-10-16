// This test will get file content and write file content
const getWriteFileContentImport = require('./import')

test('getting file content', async () => {
    const { GetFileContent, vscode, fs, path } = getWriteFileContentImport
    const { windowMessage } = vscode
    const { join } = path
    const getFileContentResult = new GetFileContent(windowMessage, fs)
    const { getFileContent } = getFileContentResult
    const exampleMdPath = join(__dirname, 'example.md')
    const { fileData } = await getFileContent(exampleMdPath)
    expect(typeof fileData).toBe('string')
})

test('writing in file content', async () => {
    const { WriteFileContent, vscode, fs, path } = getWriteFileContentImport
    const { windowMessage } = vscode
    const { join } = path
    const writeFileContentResult = new WriteFileContent(windowMessage, fs)
    const { writeFileContent } = writeFileContentResult
    const exampleMdPath = join(__dirname, 'example.md')
    const response = await writeFileContent(exampleMdPath, 'آپ کیسے ہو')
    expect(typeof response).toBe('string')
})
