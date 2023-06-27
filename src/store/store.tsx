import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import emailSlice from "./emailSlice";
const store = configureStore({
    reducer:{
        user:userSlice,
        email:emailSlice
    }
})

export default store