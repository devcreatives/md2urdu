// This test will translate string
const translateImport = require('./import')

test('translate', async () => {
    const { Translate, translate: translateAPI, vscode } = translateImport
    const { windowMessage } = vscode
    const translateResult = new Translate(translateAPI, windowMessage)
    const { translation } = translateResult
    const response = await translation('hello world')
    expect(typeof response).toBe('string')
})
