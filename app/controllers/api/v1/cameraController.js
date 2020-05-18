const { getNXBookmarks, getNXThumbnail, getNXCamera } = require('../../../services/nXService')
const { getCamera, createCamera, updateCamera, deleteCamera } = require('../../../services/cameraService')
const { getPerson, createPerson } = require('../../../services/personService')
const { getSetting, updateSetting } = require('../../../services/settingService')
const { createHistoryTrackPath, getHistoryTrackPath, getHistoryTrackPaths, updateHistoryTrackPath } = require('../../../services/historyTrackPathService')
const { createTrackPath, getTrackPath, getTrackPaths, updateTrackPath, deleteTrackPath } = require('../../../services/trackPathService')
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

exports.delete_camera = io => async (req, res) => {
    const camera = await getCamera({ id: req.params.id })
    const { dataValues } = camera
    await deleteCamera({ id: req.params.id })

    let track_paths = await getTrackPaths({
        where: {
            [db.Sequelize.Op.or]: [{ from: camera.id }, { to: camera.id }]
        }
    })

    for (let track_path of track_paths) {
        await deleteTrackPath({ id: track_path.id })
    }
    track_paths = await getTrackPaths()
    io.sockets.emit("UpdateTrackPath", track_paths)
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
        bookmark.thumbnail_url = `http://localhost:8080/camerathumbnail?cameraId=${dataValues.camera_id}&time=${bookmark.startTimeMs}`
    })
    const bookmark = bookmarks[0]
    const period = await handleURLBookmarkFromNX(bookmark, dataValues.status_id)
    bookmarks.unshift({
        isLive: true,
        description: 'LIVE',
        name: 'LIVE',
        url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`,
        thumbnail_url: `http://localhost:8080/camerathumbnail?cameraId=${dataValues.camera_id}&time=${moment().valueOf()}`
    })
    const data = {...dataValues, bookmarks: bookmarks, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4${period}`}

    await updateCamera({ status_id: 1, color: 0 }, { id: dataValues.id })
    let track_paths = await getTrackPaths({
        where: {
            [db.Sequelize.Op.or]: [{ from: camera.id }, { to: camera.id }]
        }
    })

    for (let track_path of track_paths) {
        if(track_path.from === camera.id) {
            const cam_from = await getCamera({id: track_path.to})
            if(cam_from && cam_from.color !== track_path.color) {
                await deleteTrackPath({id: track_path.id})
            }
        }
        if(track_path.to === camera.id) {
            const cam_to = await getCamera({id: track_path.from})
            if(cam_to && cam_to.color !== track_path.color) {
                await deleteTrackPath({id: track_path.id})
            }
        }
    }
    io.sockets.emit("UpdateCameraStatus", {...dataValues, status_id: 1, color: 0, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4`})
    track_paths = await getTrackPaths()
    io.sockets.emit("UpdateTrackPath", track_paths)
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

    // const bookmark_results = await getNXBookmarks({
    //     nxUsername,
    //     nxPassword,
    //     nxURL
    // }, camera_id)

    // const bookmarks = bookmark_results.data
    const bookmark = req.body

    if(bookmark) {
        const { name } = bookmark
        const index = name.indexOf('-') + 2
        
        const namePerson =  name.substr(index)

        const person = await getPerson({name: namePerson})
        if(person) {
            if(person.status === 1) {
                await updateCamera({ status_id: 3, color: person.color }, { camera_id: camera_id })

                const camera = await getCamera({ camera_id: camera_id })
                const { dataValues } = camera
                io.sockets.emit("UpdateCameraStatus", { ...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4` })

                const history_track_paths = await getHistoryTrackPaths({
                    where: {
                        person_id: person.id
                    },
                    order: [['createdAt', 'DESC']]
                })

                const history_track_path = history_track_paths[0]

                if(history_track_path) {
                    const paths = JSON.parse(history_track_path.paths)
                    const pre_camera_id = paths[paths.length - 1]
                    if(pre_camera_id !== camera.id) {
                        const pre_camera = await getCamera({id: pre_camera_id})
                        if(pre_camera && pre_camera.color === person.color) {
                            const track_path = await getTrackPath({
                                from: {
                                    [db.Sequelize.Op.or]: [pre_camera_id, camera.id]
                                },
                                to: 
                                {
                                    [db.Sequelize.Op.or]: [camera.id, pre_camera_id]
                                }
                            })
                            if(track_path) {
                                await updateTrackPath({
                                    color: person.color
                                }, {
                                    id: track_path.id
                                })
                            } else {
                                await createTrackPath({
                                    from: pre_camera_id,
                                    to: camera.id,
                                    color: person.color
                                })
                            }
                        }
                    }
                }
                
                const track_paths = await getTrackPaths({
                    where: {

                            [db.Sequelize.Op.or]: [{from: camera.id}, {to: camera.id}]
                    }
                })

                for (let track_path of track_paths) {
                    const cam_from = await getCamera({ id: track_path.from })
                    const cam_to = await getCamera({ id: track_path.to })
                    if (cam_from && cam_from.color !== track_path.color && cam_to && cam_to.color !== track_path.color) {
                        await deleteTrackPath({ id: track_path.id })
                    }
                }

                const historyTrackPath = await getHistoryTrackPath({
                    createdAt: {
                        [db.Sequelize.Op.gte]: moment(moment().add(7, 'hours').add(-1, 'days').format("MM/DD/YYYY") + " 17:00:01", "MM/DD/YYYY HH:mm:ss").toDate()
                    },
                    person_id: person.id
                })

                if (historyTrackPath) {
                    let paths = JSON.parse(historyTrackPath.paths)
                    if(paths[paths.length - 1] !== camera.id) {
                        paths.push(camera.id)
                        await updateHistoryTrackPath({
                            paths: JSON.stringify(paths)
                        }, {
                            id: historyTrackPath.id
                        })
                    }
                }
                else
                    {
                        let paths = []
                        paths.push(camera.id)
                        await createHistoryTrackPath({
                            paths: JSON.stringify(paths),
                            color: person.color,
                            person_id: person.id
                        })
                    }
            
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
    const track_paths = await getTrackPaths()
    io.sockets.emit("UpdateTrackPath", track_paths)
    res.json({
        'error': false,
        'message': 'Update successfully',
        // 'data': data
    })
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