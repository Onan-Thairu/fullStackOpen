import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = phoneObj => {
    const request = axios.post(baseUrl, phoneObj)
    return request.then(response => response.data)
}

export default {getAll, create}