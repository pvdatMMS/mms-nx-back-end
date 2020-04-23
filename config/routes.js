const { register, token } = require('../app/controllers/api/v1/authController')
const { layouts, devices } = require('../app/controllers/api/v1/layoutController')
const { persons, update_person } = require('../app/controllers/api/v1/personController')
const { bookmarks, create_camera, update_camera, delete_camera, update_camera_status, camera_thumbnail } = require('../app/controllers/api/v1/cameraController')

module.exports = (app, passport, io) => {

    app.get('/', (req, res) => res.json({ 'platform': 'mms-nx-api' }))
    app.post('/token', token)
    app.post('/register', register)

    app.get('/layouts', layouts)
    app.get('/layout/:id/devices', devices)

    app.get('/device/:id/bookmarks', bookmarks(io))
    app.post('/device/create', create_camera)
    app.post('/device/:id/update', update_camera)
    app.delete('/device/:id', delete_camera)
    app.get('/device/:camera_id/changeStatus', update_camera_status(io))

    app.get('/persons', persons)
    app.post('/person/:id/update', update_person)

    app.get('/cameraThumbnail', camera_thumbnail)
}