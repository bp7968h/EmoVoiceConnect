import axios from 'axios'
import config from '../config'

const url = `${config.BASE_URL}/api/auth`

const authenticateUser = async (credential) => {
    try {
        const request = await axios.post(url, credential)
        return request.data
    } catch (error) {
        // console.log("Error thrown");
        throw error
    }
}

export default authenticateUser