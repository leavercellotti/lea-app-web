import axios from "axios"
const BASE_URL ="http://localhost:3000/api/podcast" //"https://lea-english.onrender.com/api/podcast" //"http://localhost:3000/api/podcast"

export class PodcastAPI {
    static async getAll(level) {
        console.log("api");
        // Ajoutez le paramètre 'level' à la requête si 'level' est fourni
        const url = level ? `${BASE_URL}/all?level=${level}` : `${BASE_URL}/all`;
    
        const response = await axios.get(url);
        return response.data;
    }

    static async getById(_id) {
        const response = await axios.get(`${BASE_URL}/${_id}`)
        return (
            response.data
        )
    }

    static async getByLevel(level) {
        const response = await axios.get(`${BASE_URL}/level/${level}`)
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