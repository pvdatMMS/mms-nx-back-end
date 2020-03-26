const { getBoolmarks } = require('../../../services/nXService')
module.exports = {
    bookmarks: async (req, res) => {
        const cameraId = req.params.cameraId
        const bookmarks = await getBoolmarks(cameraId)
        const { data } = bookmarks
        res.json({
            'error': false,
            'message': 'Get successfully',
            'data': data
        })
    }
}