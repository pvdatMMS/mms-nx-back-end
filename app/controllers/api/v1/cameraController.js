const { getNXBoolmarks } = require('../../../services/nXService')
const { getCamera, createCamera, updateCamera, deleteCamera } = require('../../../services/cameraService')
const { getImageFromNX, handleURLBookmarkFromNX } = require('../../../services/ortherService')
const moment = require('moment')

exports.create_camera = io => async (req, res) => {
    const nxUsername = 'admin'
    const nxPassword = 'Admin@123'
    const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')

    try {
        await getNXBoolmarks({
            nxUsername,
            nxPassword,
            nxURL
        }, req.body.camera_id)
    } catch (e) {
        return res.status(400).json({
            'error': true,
            'message': 'Can not find cameraId ' + req.body.camera_id
        })
    }

    const camera = await createCamera(req.body)
    const { dataValues } = camera
    io.sockets.emit("AddCamera", {...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
    
    res.json({
        'error': false,
        'message': 'Add successfully',
        // 'data': result
    })
}

exports.update_camera = (io) => async (req, res) => {
    const camera_id = req.params.id
    const { id, ...dataUpdate } = req.body

    const nxUsername = 'admin'
    const nxPassword = 'Admin@123'
    const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')

    try {
        await getNXBoolmarks({
            nxUsername,
            nxPassword,
            nxURL
        }, req.body.camera_id)
    } catch (e) {
        return res.status(400).json({
            'error': true,
            'message': 'Can not find cameraId ' + req.body.camera_id
        })
    }

    await updateCamera(dataUpdate, { id: camera_id })
    const camera = await getCamera({ id: camera_id })
    const { dataValues } = camera
    io.sockets.emit("UpdateCamera", {...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
    
    res.json({
        'error': false,
        'message': 'Update successfully',
        // 'data': data
    })
}

exports.delete_camera = io => async (req, res) => {
    const camera = await getCamera({id: req.params.id})
    const { dataValues } = camera
    await deleteCamera({ id: req.params.id })
    io.sockets.emit("DeleteCamera", dataValues)
    res.json({
        'error': false,
        'message': 'Delete successfully',
        // 'data': data
    })
}

exports.bookmarks = io => async (req, res) => {
    const nxUsername = 'admin'
    const nxPassword = 'Admin@123'
    const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')
    const camera = await getCamera({id: req.params.id})
    const { dataValues } = camera
    const bookmark_results = await getNXBoolmarks({
        nxUsername,
        nxPassword,
        nxURL
    }, dataValues.camera_id)
    const bookmarks = bookmark_results.data
    bookmarks.map(async bookmark => {
        const period = await handleURLBookmarkFromNX(bookmark)
        bookmark.name = `${bookmark.name} ${moment(Number(bookmark.startTimeMs)).format('DD/MM/YYYY HH:mm:ss')}`
        bookmark.url = `http://${nxURL}/media/${dataValues.camera_id}.mp4${period}`
        bookmark.thumbnail_url = `http://${nxURL}/ec2/cameraThumbnail?cameraId=${dataValues.camera_id}&time=${dataValues.startTimeMs}&height=100`
    })
    const bookmark = bookmarks[0]
    const period = await handleURLBookmarkFromNX(bookmark, dataValues.status_id)
    bookmarks.unshift({
        isLive: true,
        description: 'LIVE',
        name: 'LIVE',
        url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`,
        thumbnail_url: `http://${nxURL}/ec2/cameraThumbnail?cameraId=${dataValues.camera_id}&height=100`
    })
    const data = {...dataValues, bookmarks: bookmarks, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4${period}`}

    await updateCamera({ status_id: 1 }, { id: dataValues.id })
    io.sockets.emit("UpdateCameraStatus", {...dataValues, status_id: 1, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
    
    res.json({
        'error': false,
        'message': 'Get successfully',
        'data': data
    })
}

exports.update_camera_status = io => async (req, res) => {
    const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')
    const camera_id = req.params.camera_id
    await updateCamera({ status_id: 3 }, { camera_id: camera_id })
    const camera = await getCamera({ camera_id: camera_id })
    const { dataValues } = camera
    io.sockets.emit("UpdateCameraStatus", {...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
}
