import axios from 'axios'
import config from './config'

const customAxios = axios.create({
    baseURL: config.BASE_URL
})

customAxios.interceptors.request.use(config => {
    // console.log('Request 1: ', window.localStorage.getItem("token"))
    const token = JSON.parse(window.localStorage.getItem("token"))
    // console.log('Request 2: ', token)
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default customAxios