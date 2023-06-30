import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import emailSlice from "./emailSlice";
import tempUserSlice from "./tempUserSlice";
import hrSlice from "./hrSlice";
import tempHrSlice from "./tempHrSlice";
const store = configureStore({
    reducer:{
        user:userSlice,
        email:emailSlice,
        tempUser:tempUserSlice,
        hr:hrSlice,
        tempHr:tempHrSlice
    }
})

export default store