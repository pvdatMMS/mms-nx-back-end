const { getLayouts, getLayout, createLayout, updateLayout, deleteLayout } = require('./layoutService')
const sqlite = require('./sqliteService')
const moment = require('moment')

exports.removeLayoutFromNX = async (nxLayouts, user_id) => {
    const layouts = await getLayouts({ where: { user_id } })

    for (let layout of layouts) {
        let isExised = false
        for (let nxLayout of nxLayouts) {
            if (layout.nx_layout_id === nxLayout.id)
                isExised = true
        }
        if (!isExised) deleteLayout({ nx_layout_id: layout.nx_layout_id })
    }
}

exports.updateLayoutFromNX = async (nxLayouts, user_id) => {
    for (let nxLayout of nxLayouts) {
        const layout = await getLayout({ nx_layout_id: nxLayout.id })
        if (layout) {
            const data = {
                name: nxLayout.name,
                image: nxLayout.backgroundImageFilename,
            }
            await updateLayout(data, { nx_layout_id: nxLayout.id })
        } else {
            const layouts = await getLayouts({
                where: { user_id },
                order: [['order', 'DESC']]
            })

            const order = layouts[0] && layouts[0].order

            const data = {
                nx_layout_id: nxLayout.id,
                name: nxLayout.name,
                image: nxLayout.backgroundImageFilename,
                user_id: user_id,
                order: order ? order + 1 : 1
            }

            await createLayout(data)
        }
    }
}


exports.getImageFromNX = async (image_name) => {
    await sqlite.open('/Users/pvdat/Desktop/RefactorTBL/mms-nx-back-end/ecs.sqlite')
    let image_buffer = ""
    await sqlite.each(`SELECT *
                         FROM vms_storedFiles
                         WHERE path='wallpapers/${image_name}'`, [], function (row) {
        image_buffer = row.data
    })
    sqlite.close()
    return image_buffer
}

exports.handleURLBookmarkFromNX = async (bookmark, status_id = null) => {
    let period = ''
    if (bookmark) {
        const startTimeMs = Number(bookmark.startTimeMs)
        const durationMs = bookmark.durationMs
        const startTime = moment(startTimeMs).add(0, 'seconds').valueOf()
        const endTime = moment(startTimeMs).add(durationMs).valueOf()
        period = `?pos=${startTime}&endPos=${endTime}`

        if (status_id === 1) {
            period = ''
        }
    }

    return period
}
