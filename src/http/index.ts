import axios from 'axios'

// export const API_URL = 'http://localhost';
export const API_URL = 'http://34.159.168.142/api/v1/'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    return config;
})

export default api