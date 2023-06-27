import { createSlice } from "@reduxjs/toolkit";



const emailSlice = createSlice({
    name:'email',
    initialState:{
        email:''
    },
    reducers:{
        insertEmail:(state,action)=>{
            state.email = action.payload
        }
    }
})
export const {insertEmail} = emailSlice.actions
export default emailSlice.reducer