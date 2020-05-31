const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    file(req, file, cb){
        const date = moment.format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5
}

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})
