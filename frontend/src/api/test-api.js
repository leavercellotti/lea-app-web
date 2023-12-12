import axios from "axios"
const BASE_URL = "http://localhost:3000/api/test"

export class TestAPI {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}/all`)
        return (
            response.data
        )
    }

    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/${_id}`)
        return (
            response.data
        )
    }

    static async delete(_id) {
        const response = await axios.delete(
            `${BASE_URL}/delete/${_id}`)
        return (
            response.data
        )
    }

    static async create(data) {
        const response = await axios.post(`${BASE_URL}/create`, data)
        return(
            response.data
        )
    }

    static async update(_id, newObject) {
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newObject)
        return (
            response.data
        )
    }
}