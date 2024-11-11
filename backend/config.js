require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const PICTURE_PATH = process.env.PICTURE_PATH
const AUDIO_PATH = process.env.AUDIO_PATH
const EMOTION_DETECT = process.env.EMOTION_DETECT
const JWT_SEC = process.env.JWT_SEC
const URL = process.env.URL

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    PICTURE_PATH,
    AUDIO_PATH,
    EMOTION_DETECT,
    JWT_SEC,
    URL
}