import axios from "axios"
const BASE_URL ="http://localhost:3000/api/podcast"//"https://lea-english.onrender.com/api/podcast" //"http://localhost:3000/api/podcast"

export class PodcastAPI {
    static async getAll(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    }

    static async getById(_id, token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/${_id}`)
        return (
            response.data
        )
    }

    static async getByLevel(level, token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/level/${level}`)
        return (
            response.data
        )
    }

    static async delete(_id, adminToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.delete(
            `${BASE_URL}/delete/${_id}`)
        return (
            response.data
        )
    }

    static async create(data, adminToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.post(`${BASE_URL}/create`, data)
        return(
            response.data
        )
    }

    static async update(_id, newObject, adminToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.put(
            `${BASE_URL}/update/${_id}`, newObject)
        return (
            response.data
        )
    }
}