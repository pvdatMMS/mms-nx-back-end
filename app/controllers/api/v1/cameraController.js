const { getNXBookmarks, getNXThumbnail, getNXCamera } = require('../../../services/nXService')
const { getCamera, createCamera, updateCamera, deleteCamera } = require('../../../services/cameraService')
const { getPerson, createPerson } = require('../../../services/personService')
const { getSetting, updateSetting } = require('../../../services/settingService')
const { handleURLBookmarkFromNX } = require('../../../services/ortherService')
const moment = require('moment')

exports.create_camera = async (req, res) => {
    const user_id = 1
    const setting = await getSetting({user_id: user_id})

    const { username, password, url } = setting

    const nxUsername = username
    const nxPassword = password
    const nxURL = url.replace('http://', '').replace('/', '')

    const nx_camera_results = await getNXCamera({
        nxUsername,
        nxPassword,
        nxURL
    }, req.body.camera_id)
    const nx_camera_result = nx_camera_results.data

    if(nx_camera_result.length) {
        const nx_camera = nx_camera_result[0]
        req.body.camera_id = nx_camera.cameraId.replace('{', '').replace('}', '')
        
        const camera = await getCamera({ camera_id: req.body.camera_id})

        if(camera) {
            return res.status(409).json({
                'error': true,
                'message': 'This value is existing!'
            })
        } else {
            const dataCreated = await createCamera(req.body)
            const { dataValues } = dataCreated

            return res.json({
                'error': false,
                'message': 'Add successfully',
                'data': { ...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4` }
            })
        }
    } else {
        return res.status(400).json({
            'error': true,
            'message': 'This value can not found!'
        })
    }
}

exports.update_camera = async (req, res) => {
    const camera_id = req.params.id
    const { id, ...dataUpdate } = req.body

    const user_id = 1
    const setting = await getSetting({user_id: user_id})

    const { username, password, url } = setting

    const nxUsername = username
    const nxPassword = password
    const nxURL = url.replace('http://', '').replace('/', '')

    const nx_camera_results = await getNXCamera({
        nxUsername,
        nxPassword,
        nxURL
    }, dataUpdate.camera_id)
    const nx_camera_result = nx_camera_results.data

    if(nx_camera_result.length) {
        const nx_camera = nx_camera_result[0]
        dataUpdate.camera_id = nx_camera.cameraId.replace('{', '').replace('}', '')
        
        const camera = await getCamera({ camera_id: dataUpdate.camera_id})

        if(camera) {
            if(camera.id === parseInt(camera_id)) {
                await updateCamera(dataUpdate, { id: camera_id })
                const camera = await getCamera({ id: camera_id })
                const { dataValues } = camera

                return res.json({
                    'error': false,
                    'message': 'Update successfully',
                    'data': { ...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4` }
                })
            } else {
                return res.status(409).json({
                    'error': true,
                    'message': 'This value is existing!'
                })
            }
        } else {
            await updateCamera(dataUpdate, { id: camera_id })
            const camera = await getCamera({ id: camera_id })
            const { dataValues } = camera

            return res.json({
                'error': false,
                'message': 'Update successfully',
                'data': { ...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4` }
            })
        }
    } else {
        return res.status(400).json({
            'error': true,
            'message': 'This value can not found!'
        })
    }
}

exports.delete_camera = async (req, res) => {
    const camera = await getCamera({ id: req.params.id })
    const { dataValues } = camera
    await deleteCamera({ id: req.params.id })
    res.json({
        'error': false,
        'message': 'Delete successfully',
        'data': dataValues
    })
}

exports.bookmarks = io => async (req, res) => {
    const user_id = 1
    const setting = await getSetting({user_id: user_id})

    const { username, password, url } = setting

    const nxUsername = username
    const nxPassword = password
    const nxURL = url.replace('http://', '').replace('/', '')

    const camera = await getCamera({id: req.params.id})
    const { dataValues } = camera
    const bookmark_results = await getNXBookmarks({
        nxUsername,
        nxPassword,
        nxURL
    }, dataValues.camera_id)
    const bookmarks = bookmark_results.data
    bookmarks.map(async bookmark => {
        const period = await handleURLBookmarkFromNX(bookmark)
        bookmark.name = `${bookmark.name} ${moment(Number(bookmark.startTimeMs)).format('DD/MM/YYYY HH:mm:ss')}`
        bookmark.url = `http://${nxURL}/media/${dataValues.camera_id}.mp4${period}`
        bookmark.thumbnail_url = `http://172.20.10.6:8080/camerathumbnail?cameraId=${dataValues.camera_id}&time=${bookmark.startTimeMs}`
    })
    const bookmark = bookmarks[0]
    const period = await handleURLBookmarkFromNX(bookmark, dataValues.status_id)
    bookmarks.unshift({
        isLive: true,
        description: 'LIVE',
        name: 'LIVE',
        url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`,
        thumbnail_url: `http://172.20.10.6:8080/camerathumbnail?cameraId=${dataValues.camera_id}&time=${moment().valueOf()}`
    })
    const data = {...dataValues, bookmarks: bookmarks, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4${period}`}

    await updateCamera({ status_id: 1, color: 0 }, { id: dataValues.id })
    io.sockets.emit("UpdateCameraStatus", {...dataValues, status_id: 1, color: 0, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
    
    res.json({
        'error': false,
        'message': 'Get successfully',
        'data': data
    })
}

exports.update_camera_status = io => async (req, res) => {
    const camera_id = req.params.camera_id

    const user_id = 1
    const setting = await getSetting({ user_id: user_id })

    const { username, password, url, maker_color } = setting

    const nxUsername = username
    const nxPassword = password
    const nxURL = url.replace('http://', '').replace('/', '')

    const bookmark_results = await getNXBookmarks({
        nxUsername,
        nxPassword,
        nxURL
    }, camera_id)

    const bookmarks = bookmark_results.data
    const bookmark = bookmarks[0]

    if(bookmark) {
        const { name } = bookmark
        const index = name.indexOf('-') + 2
        
        const namePerson =  name.substr(index)

        const person = await getPerson({name: namePerson})

        if(person) {
            if(person.status === 1) {
                await updateCamera({ status_id: 3, color: person.color }, { camera_id: camera_id })
            }
        } else {
            await createPerson({
                name: namePerson,
                color: maker_color,
                user_id: user_id
            })
            if(maker_color === 10) {
                await updateSetting({ maker_color: 1 }, { user_id: user_id })
            } else {
                await updateSetting({ maker_color: maker_color + 1 }, { user_id: user_id })
            }
        }

    }

    const camera = await getCamera({ camera_id: camera_id })
    const { dataValues } = camera
    io.sockets.emit("UpdateCameraStatus", {...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
}

exports.camera_thumbnail = async (req, res) => {
    const user_id = 1
    const setting = await getSetting({ user_id: user_id })

    const { username, password, url } = setting

    const nxUsername = username
    const nxPassword = password
    const nxURL = url.replace('http://', '').replace('/', '')

    const { cameraId, time } = req.query

    const thumbnail = await getNXThumbnail({
        nxUsername,
        nxPassword,
        nxURL
    }, cameraId, time)

    const { data } = thumbnail

    res.writeHead(200,{'Content-type':'image/jpg'})
    res.end(data)
}