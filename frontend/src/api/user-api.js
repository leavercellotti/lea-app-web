import axios from "axios"
//const BASE_URL ="http://localhost:3000/api/user"  
const BASE_URL ="https://lea-english.onrender.com/api/user"

export class UserAPI{
    static async create(user) {
        return (
            await axios.post(`${BASE_URL}/signup`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async connect(user) {
        console.log("api", user)
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
        const response = await axios.get(`${BASE_URL}/${email}`)
        console.log("user response", response.data)
        return (
            response.data
        )
    }

    static async updateLikedPodcasts(userId, liked, podcastId) {
        try {
            console.log(userId, liked)
          const response = await axios.put(`${BASE_URL}/update-liked-podcasts`, { userId,liked, podcastId });
          return response.data;
        } catch (error) {
          console.error('Error updating liked podcasts:', error);
          throw error;
        }
    }
    static async updateListenedPodcasts(userId, podcastId) {
        try {
          const response = await axios.put(`${BASE_URL}/update-listened-podcasts`, { userId, podcastId });
          return response.data;
        } catch (error) {
          console.error('Error updating listened podcasts:', error);
          throw error;
        }
    }

    static async updateNbDownloadedPodcastsToday(userId) {
      try {
        const response = await axios.put(`${BASE_URL}/update-number-downloaded-podcasts`, { userId });
        return response.data;
      } catch (error) {
        console.error('Error nb listened podcasts:', error);
        throw error;
      }
  }
    static async addCard(userId, cardId, knowledge) {
        try {
          const response = await axios.put(`${BASE_URL}/add-card`, { userId, cardId, knowledge });
          return response.data;
        } catch (error) {
          console.error('Error updating listened podcasts:', error);
          throw error;
        }
    }
    static async updateLevel(userId, level) {
        try {
            console.log("api", userId,level)
          const response = await axios.put(`${BASE_URL}/update-level`, { userId, level });
          return response.data;
        } catch (error) {
          console.error('Error updating level:', error);
          throw error;
        }
    }
}
