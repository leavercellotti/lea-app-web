import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:'',
  email:'',
  _id:'',
  podcastsListenedArray: [],
  podcastsLikedArray: [],
  nbLearnedCards :0,
  level:'',
  subscription: '',
  nbDownloadedPodcastsToday: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (currentState, action) => {
            currentState.token = action.payload.token
            currentState.email = action.payload.email
            currentState._id = action.payload._id
            currentState.podcastsLikedArray = action.payload.podcastsLikedArray
            currentState.podcastsListenedArray = action.payload.podcastsListenedArray
            currentState.nbLearnedCards = action.payload.nbLearnedCards
            if(action.payload.level) {
                currentState.level = action.payload.level
            }
            currentState.subscription = action.payload.subscription
            currentState.nbDownloadedPodcastsToday = action.payload.nbDownloadedPodcastsToday
        },
        setEmail: (currentState, action) => {
            currentState.email = action.payload.email
        },
        setUserId: (currentState, action) => {
            currentState._id = action.payload;
        },
        setPodcastsLikedArray: (currentState, action) => {
            currentState.podcastsLikedArray = action.payload;
        }, 
        addPodcastLikedArray: (currentState, action) => {
            currentState.podcastsLikedArray.push(action.payload);
            localStorage.setItem('user-info', JSON.stringify(currentState))
        }, 
        removePodcastLikedArray: (currentState, action) => {
            currentState.podcastsLikedArray =currentState.podcastsLikedArray.filter(id => id !== action.payload);
            localStorage.setItem('user-info', JSON.stringify(currentState))
        },
        setPodcastsListenedArray: (currentState, action) => {
            currentState.podcastsListenedArray = action.payload;
        }, 
        addPodcastListenedArray: (currentState, action) => {
            currentState.podcastsListenedArray.push(action.payload);
            localStorage.setItem('user-info', JSON.stringify(currentState))
        }, 
        removePodcastListenedArray: (currentState, action) => {
            currentState.podcastsListenedArray =currentState.podcastsListenedArray.filter(id => id !== action.payload);
            localStorage.setItem('user-info', JSON.stringify(currentState))
        },
        addLearnedCard: (currentState, action) => {
            const nbLearnedCardsNew = currentState.nbLearnedCards+1;
            currentState.nbLearnedCards = nbLearnedCardsNew
            localStorage.setItem('user-info', JSON.stringify(currentState))
        }, 
        modifyLevel: (currentState, action) => {
            currentState.level = action.payload;
            localStorage.setItem('user-info', JSON.stringify(currentState))
        },
        addNbDownloadedPodcastsToday: (currentState, action) => {
            const modified = currentState.nbDownloadedPodcastsToday+1;
            currentState.nbDownloadedPodcastsToday = modified
            localStorage.setItem('user-info', JSON.stringify(currentState))
        },
    }
})

export const {
    setUser, setEmail, setUserId, 
    setPodcastsLikedArray, addPodcastLikedArray, 
    removePodcastLikedArray, setPodcastsListenedArray,
    addPodcastListenedArray, removePodcastListenedArray,
    addLearnedCard, modifyLevel,
    addNbDownloadedPodcastsToday
} = userSlice.actions
export const userReducer = userSlice.reducer