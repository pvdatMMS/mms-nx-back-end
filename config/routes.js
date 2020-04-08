const { register, token } = require('../app/controllers/api/v1/authController')
const { layouts, devices } = require('../app/controllers/api/v1/layoutController')
const { bookmarks, create_camera, update_camera, delete_camera, update_camera_status } = require('../app/controllers/api/v1/cameraController')

module.exports = (app, passport, io) => {

    app.get('/', (req, res) => res.json({ 'platform': 'mms-nx-api' }))
    app.post('/token', token)
    app.post('/register', register)
    app.get('/layouts', layouts)
    app.get('/layout/:id/devices', devices)
    app.get('/device/:id/bookmarks', bookmarks(io))
    app.post('/device/create', create_camera(io))
    app.post('/device/:id/update', update_camera(io))
    app.delete('/device/:id', delete_camera(io))
    app.get('/device/:camera_id/changeStatus', update_camera_status(io))
}