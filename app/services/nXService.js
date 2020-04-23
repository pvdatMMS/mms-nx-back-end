const axios = require('axios')

exports.getNXBookmarks = async ({ nxUsername, nxPassword, nxURL }, cameraId) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/bookmarks?cameraId=${cameraId}&sortBy=startTime&sortOrder=desc`)

exports.getNXLayouts = async ({ nxUsername, nxPassword, nxURL }) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/getLayouts`)

exports.getNXThumbnail = async ({ nxUsername, nxPassword, nxURL }, cameraId, period) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/cameraThumbnail?cameraId=${cameraId}&time=${period}`, { responseType: 'arraybuffer' })

exports.backupNXDatabase = async ({ nxUsername, nxPassword, nxURL }) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/api/backupDatabase`)

exports.getNXCamera = async ({ nxUsername, nxPassword, nxURL }, cameraId) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/getCameraUserAttributesList?id=${cameraId}`)