import axios from 'axios'

const Api = axios.create({
    baseURL: `https://apipoll.herokuapp.com/`
})

export default Api