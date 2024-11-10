import axios from 'axios'
import config from '../config'

const url = `${config.BASE_URL}/api/user`

const registerUser = async (userData) => {
    try {
        const request = await axios.post(url, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return request.data
    } catch (error) {
        throw error
    }
}


export default registerUser