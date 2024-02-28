import axios from "axios"
const BASE_URL ="http://localhost:3000/api/admin"  
//const BASE_URL ="https://lea-english.onrender.com/api/admin"

export class AdminAPI{
    static async connect(admin) {
        return (
            await axios.post(`${BASE_URL}/login`, admin)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error, error.response.status);
                    return false
                }
            }
        ))
    }
}
