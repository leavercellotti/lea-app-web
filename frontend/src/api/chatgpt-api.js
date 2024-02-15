import axios from "axios"
const BASE_URL ="http://localhost:3000/api/chatgpt"  
//const BASE_URL ="https://lea-english.onrender.com/api/chatgpt"

export class ChatgptAPI{
    static async connect(data) {        
        const {userId, messages} = data
        console.log(data, userId, messages)
        return (
            await axios.post(`${BASE_URL}/connect`, {
                userId:userId,
                model: 'gpt-3.5-turbo',
                messages:messages, // Ajoutez le nouveau message à l'historique
              })
            .catch(function(error) {
                if (error.response) {
                    console.log("error status", messages,error.response.status);
                    return false
                }
            }
        ))
    }
}