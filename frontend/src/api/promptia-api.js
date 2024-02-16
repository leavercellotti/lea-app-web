import axios from "axios"
//const BASE_URL ="http://localhost:3000/api/promptia"
const BASE_URL ="https://lea-english.onrender.com/api/promptia"   

export class PromptiaAPI {
    static async getDailyPrompt(level, token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/daily/${level}`);
        return response.data;
    }

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