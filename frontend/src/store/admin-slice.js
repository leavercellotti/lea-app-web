import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:''
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setTokenAdmin: (currentState, action) => {
            currentState.token = action.payload.token
        }
    }
})

export const {setTokenAdmin} = adminSlice.actions
export const adminReducer = adminSlice.reducer