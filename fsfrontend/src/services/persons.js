import axios from "axios"
const baseUrl = "/api/notes/"

const getAll = () => {
    const request = axios.get(`http://localhost:3001/api/notes/`)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(`${baseUrl}`, newObject)
    return request
}

const remove = id => {
    const request = axios.delete(`${baseUrl}${id}`)
    return request.then(response => response.data)
}

const getPerson = id => {
    const request = axios.get(`${baseUrl}${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}${id}`, newObject)
    return request.then(response => response.data)
};

export {
    getAll,
    create,
    remove,
    getPerson,
    updatePerson
}
