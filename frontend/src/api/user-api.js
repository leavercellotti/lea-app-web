import axios from "axios"
// const BASE_URL ="http://localhost:3000/api/user"  
const BASE_URL ="https://lea-english.onrender.com/api/user"

export class UserAPI{
    static async create(user, stripeId) {
      console.log(stripeId,user)
        return (
            await axios.post(`${BASE_URL}/signup`, {...user, stripeId})
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async add(user) {
      console.log(user)
        return (
            await axios.post(`${BASE_URL}/add`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async connect(user) {
        return (
            await axios.post(`${BASE_URL}/login`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async get(email) {
        const response = await axios.get(`${BASE_URL}/byEmail/${email}`)
        console.log("user response", response.data)
        return (
            response.data
        )
    }

    static async updateLikedPodcasts(token, userId, liked, podcastId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.put(`${BASE_URL}/update-liked-podcasts`, { userId,liked, podcastId });
          return response.data;
        } catch (error) {
          console.error('Error updating liked podcasts:', error);
          throw error;
        }
    }
    static async updateListenedPodcasts(token, userId, podcastId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
          const response = await axios.put(`${BASE_URL}/update-listened-podcasts`, { userId, podcastId });
          return response.data;
        } catch (error) {
          console.error('Error updating listened podcasts:', error);
          throw error;
        }
    }

    static async updateNbDownloadedPodcastsToday(token, userId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.put(`${BASE_URL}/update-number-downloaded-podcasts`, { userId });
        return response.data;
      } catch (error) {
        console.error('Error nb listened podcasts:', error);
        throw error;
      }
    }
    static async addCard(token, userId, cardId, knowledge) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.put(`${BASE_URL}/add-card`, { userId, cardId, knowledge });
          return response.data;
        } catch (error) {
          console.error('Error updating listened podcasts:', error);
          throw error;
        }
    }
    static async updateLevel(token, userId, level) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            console.log("api", userId,level)
          const response = await axios.put(`${BASE_URL}/update-level`, { userId, level });
          return response.data;
        } catch (error) {
          console.error('Error updating level:', error);
          throw error;
        }
    }
    static async updateNbChatsMade(token, userId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.put(`${BASE_URL}/update-nbChatsMade`, { userId });
        return response.data;
      } catch (error) {
        console.error('Error nb chats:', error);
        throw error;
      }
  }

  static async sendPasswordResetEmail(email) {
    console.log(email)
    return (
        await axios.post(`${BASE_URL}/reset-password`, email)
        .catch(function(error) {
            if (error.response) {
                console.log("error status",error.response.status);
                return false
            }
        }
    ))
  }

  static async verifyUser(email, enteredOTP) {
    console.log(email, enteredOTP)
    return (
        await axios.post(`${BASE_URL}/verify-user`, {email, enteredOTP})
        .catch(function(error) {
            if (error.response) {
                console.log("error status",error.response.status);
                return false
            }
        }
    ))
  }

  static async updatePW(userId, password) {
    console.log("api", userId, password)
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
          console.log("api", userId,password)
        const response = await axios.put(`${BASE_URL}/update-password`, { userId, password });
        return response.data;
      } catch (error) {
        console.error('Error updating password:', error);
        throw error;
      }
  }

  static async updateSubscriptionId(userId, subscriptionId) {
      try {
          console.log("api", userId,subscriptionId)
        const response = await axios.put(`${BASE_URL}/update-subscriptionId`, { userId, subscriptionId });
        return response.data;
      } catch (error) {
        console.error('Error updating subscriptionId:', error);
        throw error;
      }
  }

  static async updateSessionId(userId, sessionId) {
    try {
        console.log("api", userId,sessionId)
      const response = await axios.put(`${BASE_URL}/update-sessionId`, { userId, sessionId });
      return response.data;
    } catch (error) {
      console.error('Error updating sessionId:', error);
      throw error;
    }
  }
  static async updateStripeId(userId, stripeId) {
    try {
        console.log("api", userId,stripeId)
      const response = await axios.put(`${BASE_URL}/update-stripeId`, { userId, stripeId });
      return response.data;
    } catch (error) {
      console.error('Error updating stripeId:', error);
      throw error;
    }
  }

  static async unsubscribe(userId, email) {
    try {
        console.log("api", userId)
      const response = await axios.delete(`${BASE_URL}/unsubscribe/${userId}/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  static async getAll(token) {
    console.log("all")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${BASE_URL}/allUsers`);
    return response.data;
} 
}
