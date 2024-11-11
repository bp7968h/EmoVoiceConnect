const uploadRouter = require('express').Router()
const fs = require('fs');
const upload = require('../utils/storage');
const path = require('path');
const config = require('../config');

// Route to upload files
uploadRouter.post('/', upload.fields([{ name: 'picture' }, { name: 'audio' }]), (req, res) => {
    if (req.files) {
        const picturePath = req.files['picture'] ? req.files['picture'][0].filename : null;
        const audioPath = req.files['audio'] ? req.files['audio'][0].filename : null;
        return res.status(200).json({ message: 'Files uploaded successfully', picturePath, audioPath });
    } else {
        return res.status(400).json({ message: 'No files were uploaded' });
    }
});

// Route to retrieve files securely
uploadRouter.get('/:type/:filename', (req, res) => {
    console.log("Python hit this get api");
    const { type, filename } = req.params;

    const filePath = type === 'pictures'
        ? path.resolve(config.PICTURE_PATH, filename)
        : type === 'voices'
        ? path.resolve(config.AUDIO_PATH, filename)
        : null;

    if (!filePath || !fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = uploadRouter;