const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config');
const fs = require('fs');
const UserRouter = require('express').Router()
const User = require('../models/user')
const upload = require('../utils/storage')
const detectEmotion = require('../utils/emotion')
const tokenExtractor = require('../middlewares/tokenExtractor')
const userExtractor = require('../middlewares/userExtractor')
const { deleteFile } = require('../utils/fileCleanup');

UserRouter.post('/', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (request, response, next) => {
    let picturePath = null;
    let audioPath = null;

    try {
        // console.log('Req: ', request)
        const { email, password, name, gender } = request.body
        const passwordHash = await bcrypt.hash(password, 10)

        picturePath = request.files.picture ? request.files.picture[0].path : null;
        audioPath = request.files.audio ? request.files.audio[0].path : null;

        // Token valid for 5 minutes and call model api
        const tempToken = jwt.sign({ email },config.JWT_SEC, { expiresIn: '5m', algorithm: 'HS256' } )
        const emotion = await detectEmotion(audioPath, tempToken);

        const user = new User({
            email,
            passwordHash,
            name,
            gender,
            emotion,
            picture: picturePath,
            audio: audioPath
        })

        const savedUser = await user.save()
        if (savedUser) {
            return response.status(201).json({ message: 'User Registered Successfully' })
        }
        const e = new Error();
        e.name = "UserCreationFailed";

        throw e;

    } catch (error) {

        if (picturePath && !fs.existsSync(picturePath)) {
            try {
                fs.unlinkSync(picturePath);
                // console.log('Cleaned up picture file:', picturePath);
            } catch (err) {
                // console.error('Failed to delete picture file:', err);
            }
        }

        if (audioPath && !fs.existsSync(audioPath)) {
            try {
                fs.unlinkSync(audioPath);
                // console.log('Cleaned up audio file:', audioPath);
            } catch (err) {
                // console.error('Failed to delete audio file:', err);
            }
        }
        next(error)
    }
})

UserRouter.get('/', tokenExtractor, userExtractor, async (request, response, next) => {
    try {
        const users = await User.findById(request.user.id)
        if (!users) {
            return response.status(500).json({ message: 'Error Getting User' })
        }
        return response.status(200).json(users)
    } catch (error) {
        next(error)
    }
})


UserRouter.put('/profile', tokenExtractor, userExtractor, upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (request, response, next) => {
    try {
        const { newName } = request.body
        const newPic = request.files.picture?.[0]?.path || null;
        const newAudio = request.files.audio?.[0]?.path || null;

        const currentUser = await User.findById(request.user.id).lean();
        const oldPic = currentUser?.picture;
        const oldAudio = currentUser?.audio;

        const updateFields = {};

        if (newName) updateFields.name = newName;
        if (newPic) updateFields.picture = newPic;
        if (newAudio) {
          const emotion = await detectEmotion(newAudio, request.token);
          updateFields.audio = newAudio;
          updateFields.emotion = emotion;
        }

        if (Object.keys(updateFields).length === 0) {
          return response.status(400).json({ message: 'Cannot Update Profile without any Changes' });
        }

        await User.findByIdAndUpdate(request.user.id, updateFields, { new: true }).lean();

        if (newPic && oldPic) await deleteFile(oldPic);
        if (newAudio && oldAudio) await deleteFile(oldAudio);

        return response.status(201).json({
          ...updateFields,
          message: 'Profile Updated Successfully',
        });

    } catch (error) {
        console.log('Error Triggered: ', error)
        next(error)
    }
})


module.exports = UserRouter