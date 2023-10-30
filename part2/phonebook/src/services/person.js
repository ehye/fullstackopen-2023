import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)

}

const update = (id, newObject, setAddedMessage) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data).catch((error) => {
        setAddedMessage(
            `Information of '${newObject.newName}' has already been removed from server`
        )
        setTimeout(() => {
            setAddedMessage(null)
        }, 5000)
    })
}

const deleteById = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    delete: deleteById
}
