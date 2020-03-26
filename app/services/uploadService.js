const multer = require('multer')

module.exports = () => {
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/uploads')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    return multer({ storage })
}