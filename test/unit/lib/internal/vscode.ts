module.exports = {
    windowMessage: {
        window: {
            showInformationMessage: (response: String) => {
                console.log(response)
            },
        },
    },
    currentWorkSpace: {
        workspace: { textDocuments: [{ languageId: 'markdown' }] },
    },
}
