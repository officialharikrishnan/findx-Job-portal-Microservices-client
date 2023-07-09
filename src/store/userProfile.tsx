import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name:'user',
    initialState:{
        user:{}
    },
    reducers:{
        insertProfile:(state,action)=>{
            console.log(action)
            state.user=action.payload
        }
    }
})
export const {insertProfile} =userProfileSlice.actions
export default userProfileSlice.reducer