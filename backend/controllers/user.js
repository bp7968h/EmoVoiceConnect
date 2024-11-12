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
        const newPic = request.files.picture ? request.files.picture[0].path : null
        const newAudio = request.files.audio ? request.files.audio[0].path : null;
        if (newName && newPic) {
            const updatedUser = await User.findByIdAndUpdate(request.user.id, { name: newName, picture: newPic }, { new: true }).lean()
        
            return response.status(201).json({ name: newName, picture: newPic, message: 'User Name and PIcture Updated Successfully' })
        } else if (newName && !newPic) {
            const updatedUser = await User.findByIdAndUpdate(request.user.id, { name: newName }, { new: true }).lean()
            
            return response.status(201).json({ name: newName, message: 'User Name Updated Successfully' })
        } else if (!newName && newPic) {
            const updatedUser = await User.findByIdAndUpdate(request.user.id, { picture: newPic }, { new: true }).lean()
            
            return response.status(201).json({ picture: newPic, message: 'User Profile PIcture Updated Successfully' })
        } else if (newAudio) {
            const emotion = await detectEmotion(newAudio, request.token)
            const updatedUser = await User.findByIdAndUpdate(request.user.id, { audio: newAudio, emotion: emotion }, { new: true }).lean()
            
            return response.status(201).json({ audio: newAudio, emotion: emotion, message: 'Voice Memo Updated Successfully' })
        } else {
            return response.status(400).json({ message: 'Cannot Update Profile without any Changes' })
        }
    } catch (error) {
        console.log('Error Triggered: ', error)
        next(error)
    }
})


module.exports = UserRouter