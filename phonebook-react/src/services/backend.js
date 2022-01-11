import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
} 

const deletion = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const create = newPerson => {
    return axios.post(baseURL, newPerson)
}

const replace = (id, newPerson) => {
    console.log(id)
    const response = axios.put(`${baseURL}/${id}`, newPerson)
    console.log(response.then)
    return response.then(answ => answ.data)
}

export default {getAll, deletion, create, replace}