const base64_encode = require('../../../services/base64Service')
const { getLayouts } = require('../../../services/layoutService')
const { getBoolmarks } = require('../../../services/nXService')
const { getCameras, addCamera, updateCamera, deleteCamera } = require('../../../services/cameraService')
const sqlite = require('../../../services/sqliteService')
const moment = require('moment')
module.exports = {
    add_camera: async (req, res) => {
        try {
            await getBoolmarks(req.body.camera_id)
        } catch (e) {
            return res.status(400).json({
                'error': true,
                'message': 'Can not find cameraId ' + req.body.camera_id,
                // 'data': data
            })
        }
        let dataTemp = []
        let data = []
        await addCamera(req.body)
        let layouts = await getLayouts()
        await sqlite.open('/Users/pvdat/Desktop/ecs.sqlite')
        for(let i = 0; i < layouts.length; i++) {
            const cameras = await getCameras(layouts[i].id)
            let image_buffer = ""
            await sqlite.each(`SELECT *
                         FROM vms_storedFiles
                         WHERE path='wallpapers/${layouts[i].image}'`, [], function(row) {
                            image_buffer = row.data
                        })
            const obj = {
                ...layouts[i].dataValues,
                image: `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}`,
                 cameras: cameras, cameraTemp: []}
            if(i % 2 !== 0) {
                dataTemp.push(obj)
                data.push(dataTemp)
                dataTemp = []
            } else {
                dataTemp.push(obj)
            }
            if(i === layouts.length - 1) {
                data.push(dataTemp)
            }
        }
        sqlite.close();
        res.json({
            'error': false,
            'message': 'Add successfully',
            'data': data
        })
    },
    update_camera: async (req, res) => {
        const cameraId = req.params.id;
        const { id, ...dataUpdate } = req.body
        let dataTemp = []
        let data = []
        await updateCamera({id: cameraId}, dataUpdate)
        let layouts = await getLayouts()
        await sqlite.open('/Users/pvdat/Desktop/ecs.sqlite')
        for(let i = 0; i < layouts.length; i++) {
            const cameras = await getCameras(layouts[i].id)
            let image_buffer = ""
            await sqlite.each(`SELECT *
                         FROM vms_storedFiles
                         WHERE path='wallpapers/${layouts[i].image}'`, [], function(row) {
                            image_buffer = row.data
                        })
            const obj = {
                ...layouts[i].dataValues,
                image: `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}`,
                 cameras: cameras, cameraTemp: []}
            if(i % 2 !== 0) {
                dataTemp.push(obj)
                data.push(dataTemp)
                dataTemp = []
            } else {
                dataTemp.push(obj)
            }
            if(i === layouts.length - 1) {
                data.push(dataTemp)
            }
        }
        sqlite.close();
        res.json({
            'error': false,
            'message': 'Update successfully',
            'data': data
        })
    },
    delete_camera: async (req, res) => {
        await deleteCamera({id: req.params.id})
        res.json({
            'error': false,
            'message': 'Delete successfully',
            // 'data': data
        })
    },
    update_camera_status: io => async (req, res) => {
        const cameraId = req.params.cameraId;
        await updateCamera({camera_id: cameraId}, {
            status_id: 3
        })
        let dataTemp = []
        let data = []
        let layouts = await getLayouts()
        await sqlite.open('/Users/pvdat/Desktop/ecs.sqlite')
        for(let i = 0; i < layouts.length; i++) {
            const cameras = await getCameras(layouts[i].id)
            let cameraData = []
            for(let j = 0; j < cameras.length; j++) {
              const dataValues = cameras[j].dataValues
              const bookmark_results = await getBoolmarks(dataValues.cameraId)
              const allBookmarks = bookmark_results.data
              let bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4`
              if (allBookmarks.length) {
                const bookmark = allBookmarks[0]
                const startTimeMs = Number(bookmark.startTimeMs)
                const durationMs = bookmark.durationMs
                const startTime = moment(startTimeMs).add(0, 'seconds').valueOf()
                const endTime = moment(startTimeMs).add(durationMs).valueOf()
                bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4?pos=${startTime}&endPos=${endTime}`

                if (dataValues.statusId === 1) {
                  bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4`
                }
                cameraData.push({...dataValues, url: bookmark_url, start_time: startTime, bookmarks: allBookmarks})
              } else {
                cameraData.push({...dataValues, url: bookmark_url, bookmarks: allBookmarks})
              }
            }
            let image_buffer = ""
            await sqlite.each(`SELECT *
                         FROM vms_storedFiles
                         WHERE path='wallpapers/${layouts[i].image}'`, [], function(row) {
                            image_buffer = row.data
                        })
            const obj = {
                ...layouts[i].dataValues,
                image: `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}`,
                 cameras: cameraData, cameraTemp: []}
            if(i % 2 !== 0) {
                dataTemp.push(obj)
                data.push(dataTemp)
                dataTemp = []
            } else {
                dataTemp.push(obj)
            }
            if(i === layouts.length - 1) {
                data.push(dataTemp)
            }
        }
        sqlite.close();
        io.sockets.emit("UpdateStatus", data)
    },
    update_status: io => async (req, res) => {
        const id = req.params.id;
        await updateCamera({id: id}, {
            status_id: req.body.statusId
        })
        let dataTemp = []
        let data = []
        let layouts = await getLayouts()
        await sqlite.open('/Users/pvdat/Desktop/ecs.sqlite')
        for(let i = 0; i < layouts.length; i++) {
            const cameras = await getCameras(layouts[i].id)
            let cameraData = []
            for(let j = 0; j < cameras.length; j++) {
              const dataValues = cameras[j].dataValues
              const bookmark_results = await getBoolmarks(dataValues.cameraId)
              const allBookmarks = bookmark_results.data
              let bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4`
              if (allBookmarks.length) {
                const bookmark = allBookmarks[0]
                const startTimeMs = Number(bookmark.startTimeMs)
                const durationMs = bookmark.durationMs
                const startTime = moment(startTimeMs).add(0, 'seconds').valueOf()
                const endTime = moment(startTimeMs).add(durationMs).valueOf()
                bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4?pos=${startTime}&endPos=${endTime}`

                if (dataValues.statusId === 1) {
                  bookmark_url = `http://210.245.35.97:7001/media/${dataValues.cameraId}.mp4`
                }
                cameraData.push({...dataValues, url: bookmark_url, start_time: startTime, bookmarks: allBookmarks})
              } else {
                cameraData.push({...dataValues, url: bookmark_url, bookmarks: allBookmarks})
              }
            }
            let image_buffer = ""
            await sqlite.each(`SELECT *
                         FROM vms_storedFiles
                         WHERE path='wallpapers/${layouts[i].image}'`, [], function(row) {
                            image_buffer = row.data
                        })
            const obj = {
                ...layouts[i].dataValues,
                image: `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}`,
                 cameras: cameraData, cameraTemp: []}
            if(i % 2 !== 0) {
                dataTemp.push(obj)
                data.push(dataTemp)
                dataTemp = []
            } else {
                dataTemp.push(obj)
            }
            if(i === layouts.length - 1) {
                data.push(dataTemp)
            }
        }
        sqlite.close();
        io.sockets.emit("UpdateStatus", data)
    }
}