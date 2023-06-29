import { createSlice } from "@reduxjs/toolkit";

const tempUserSlice = createSlice({
    name:'user',
    initialState:{
        user:{}
    },
    reducers:{
        createUser:(state,action)=>{
            state.user=action.payload
        }
    }
})

export const {createUser} = tempUserSlice.actions
export default tempUserSlice.reducer