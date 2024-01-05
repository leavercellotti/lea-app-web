import {configureStore} from "@reduxjs/toolkit"
import { adminSlice } from "./admin-slice"

const store = configureStore({
    reducer:{
        ADMIN:adminSlice.reducer,
    },
})

export { store }