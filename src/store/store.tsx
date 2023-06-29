import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import emailSlice from "./emailSlice";
import tempUserSlice from "./tempUserSlice";
import hrSlice from "./hrSlice";
const store = configureStore({
    reducer:{
        user:userSlice,
        email:emailSlice,
        tempUser:tempUserSlice,
        hr:hrSlice
    }
})

export default store