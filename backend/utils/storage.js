const multer = require('multer')
const config = require('../config')
const path = require('path')
const fs = require('fs');

const createFolderIfNotExist = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};
createFolderIfNotExist(config.PICTURE_PATH);
createFolderIfNotExist(config.AUDIO_PATH);

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        if (file.fieldname === 'picture') {
            // console.log('Check: ', config.PICTURE_PATH)
            cb(null, config.PICTURE_PATH)
        }
        else if (file.fieldname === 'audio') {
            // console.log('Check: ', config.AUDIO_PATH)
            cb(null, config.AUDIO_PATH)
        } else {
            cb(new Error('Unsupported File Type'), false)
        }
    },
    filename: function (request, file, cb) {
        //unique file name
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
}) 

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log('Mime ', file.mimetype);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg',  'audio/x-wav', 'audio/wav', 'audio/vnd.wave'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const e = new Error();
            e.name = "UploadError";
            cb(e);
        }
    }
});

module.exports = upload;