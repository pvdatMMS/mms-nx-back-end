const { test } = require('../app/controllers/api/v1/testController')
const { register, token } = require('../app/controllers/api/v1/authController')
const { upload } = require('../app/controllers/api/v1/uploadController')
const { layouts } = require('../app/controllers/api/v1/layoutController')
const { add_camera, update_camera, delete_camera, update_camera_status, update_status} = require('../app/controllers/api/v1/cameraController')
const { bookmarks } = require('../app/controllers/api/v1/bookmarkController')
const uploadFile = require('../app/services/uploadService')

module.exports = (app, passport, io) => {

    app.get('/', (req, res) => {
        return res.json({
            'platform': 'mms-nx-api'
        })
    })
    app.get('/test', passport.authenticate('jwt', { session: false }), test)
    app.post('/token', token)
    app.post('/register', register)
    app.post('/upload', uploadFile().single('image'), upload)
    app.get('/layouts', layouts)
    app.get('/device/:cameraId/bookmarks', bookmarks)
    app.post('/device/add', add_camera)
    app.post('/device/:id/update', update_camera)
    app.delete('/device/:id', delete_camera)
    app.get('/device/:cameraId/changeStatus', update_camera_status(io))
    app.post('/device/:id/changeStatus', update_status(io))
}