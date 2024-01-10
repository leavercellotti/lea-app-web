import {configureStore} from "@reduxjs/toolkit"
import { adminSlice } from "./admin-slice"
import { userSlice } from "./user-slice"

const store = configureStore({
    reducer:{
        ADMIN:adminSlice.reducer,
        USER:userSlice.reducer,
    },
})

export { store }