const axios = require('axios')
const config = require('../config')

const detectEmotion = async (audioFilePath, token) => {
    try {
        console.log("Token: ", token);
        console.log("Audtio Url: ", audioFilePath);

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
        console.log('Error Detecting Emotion: ', error.message)
        throw error
    }
}

module.exports = detectEmotion