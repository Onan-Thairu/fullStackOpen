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

const delNum = id => {
    return axios.delete(`${baseUrl}/${id}`)
    //return request.then(response => console.log(response))
}


export default {getAll, create, delNum}