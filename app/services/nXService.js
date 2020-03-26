const axios = require('axios')

module.exports = {
    getBoolmarks: async (cameraId) => {
        return axios.get(`http://admin:Admin@123@210.245.35.97:7001/ec2/bookmarks?cameraId=${cameraId}&sortBy=startTime&sortOrder=desc`)
    },
    getNxLayouts: async () => {
        return axios.get(`http://admin:Admin@123@210.245.35.97:7001/ec2/getLayouts`)
    }
}