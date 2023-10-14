import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://voidstoreapi.onrender.com'
})

export default instance