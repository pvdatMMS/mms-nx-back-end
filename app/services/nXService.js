const axios = require('axios')

exports.getNXBoolmarks = async ({ nxUsername, nxPassword, nxURL }, cameraId) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/bookmarks?cameraId=${cameraId}&sortBy=startTime&sortOrder=desc`)

exports.getNXLayouts = async ({ nxUsername, nxPassword, nxURL }) =>
    axios.get(`http://${nxUsername}:${nxPassword}@${nxURL}/ec2/getLayouts`)