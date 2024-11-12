const axios = require('axios')
const config = require('../config')

const detectEmotion = async (audioFilePath, token) => {
    try {
        const audioUrl = `${config.URL}:${config.PORT}/api/${audioFilePath}`;
        const response = await axios.post(config.EMOTION_DETECT, {
            file_url: audioUrl,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.emotion;

    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = detectEmotion