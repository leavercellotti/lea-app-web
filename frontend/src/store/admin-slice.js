import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnect:false,
  token:''
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setConnect: (currentState) => {
            currentState.isConnect = true
        },
        setNotConnect: (currentState) => {
            currentState.isConnect = false
            currentState.token =""
        },
        setToken: (currentState, action) => {
            currentState.token = action.payload.token
        }
    }
})

export const {setConnect, setNotConnect, setToken} = adminSlice.actions
export const adminReducer = adminSlice.reducer