import axios from "axios"
const BASE_URL = "http://localhost:3000/api/stripe"
// const BASE_URL ="https://lea-english.onrender.com/api/stripe"   


export class StripeAPI {
    static async checkout(subscription, freeTrial) {
        console.log("api", subscription, freeTrial)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.post(`${BASE_URL}/checkout`,{subscription, freeTrial})
        console.log(response.data)
        return(
            response.data
        )
    }
    static async createSubscription() {
        console.log("api")
        // axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.post(`${BASE_URL}/createSubscription`)
        console.log(response.data)
        return(
            response.data
        )
    }
    static async createCustomer(name,email) {
        console.log("api")
        // axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.post(`${BASE_URL}/createCustomer`,{name,email})
        console.log(response.data)
        return(
            response.data
        )
    }
    static async subscription(sessionId) {
        console.log("api subscription",sessionId)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.get(`${BASE_URL}/subscription/${sessionId}`)
        console.log(response.data)
        return(
            response.data
        )
    }

    static async sessionInfo(sessionId) {
        console.log("api subscription",sessionId)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        const response = await axios.get(`${BASE_URL}/sessionInfo/${sessionId}`)
        console.log(response.data)
        return(
            response.data
        )
    }
}