const base64_encode = require('../../../services/base64Service')
const { getNxLayouts, getBoolmarks } = require('../../../services/nXService')
const { getLayouts, createOrUpdateLayout, deleteLayout } = require('../../../services/layoutService')
const { getCameras } = require('../../../services/cameraService')
const sqlite = require('../../../services/sqliteService')
const moment = require('moment')
module.exports = {
    images: (req, res) => {
        res.json({
            base64: base64_encode('public/images/uploads/1583389452808-4004594.png')
        })
    },
    layouts: async (req, res) => {
        const nxLayouts = await getNxLayouts()

        const layouts = await getLayouts()
    
        const nxLayoutData = nxLayouts.data
    
        for (let i = 0; i < layouts.length; i++) {
          let isExised = false
          for (let j = 0; j < nxLayoutData.length; j++) {
            if (layouts[i].nx_layout_id === nxLayoutData[j].id) {
              isExised = true
            }
            
          }
        
          if (!isExised) {
            await deleteLayout(layouts[i].nx_layout_id)
          }
        }
    
        for (let i = 0; i < nxLayoutData.length; i++) {
          const data = {
            nx_layout_id: nxLayoutData[i].id,
            name: nxLayoutData[i].name,
            image: nxLayoutData[i].backgroundImageFilename,
            user_id: 1,
            order: i + 1
          }
          await createOrUpdateLayout(data)
        }
        
        let dataTemp = []
        let data = []
        let newLayouts = await getLayouts()

        await sqlite.open('/Users/pvdat/Desktop/ecs.sqlite')

        for(let i = 0; i < newLayouts.length; i++) {
            const cameras = await getCameras(newLayouts[i].id)
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
                         WHERE path='wallpapers/${newLayouts[i].image}'`, [], function(row) {
                            image_buffer = row.data
                        })
            const obj = {
                ...newLayouts[i].dataValues,
                image: `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}`,
                 cameras: cameraData, cameraTemp: []}
            if(i % 2 !== 0) {
                dataTemp.push(obj)
                data.push(dataTemp)
                // if(i < newLayouts.length) {
                    dataTemp = []
                // }
            } else {
                dataTemp.push(obj)
            }
            if(i === newLayouts.length - 1) {
                data.push(dataTemp)
            }
        }

        sqlite.close();

        res.json({
            'error': false,
            'message': 'Get successfully',
            'data': data
        })
    }
}