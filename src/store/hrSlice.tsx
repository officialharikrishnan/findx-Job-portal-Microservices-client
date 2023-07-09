import { createSlice } from "@reduxjs/toolkit";

const hrSlice = createSlice({
    name:'hr',
    initialState:{
        hr:null
    },
    reducers:{
        insertHr:(state,action)=>{
            state.hr=action.payload
        }
    }
})
export const {insertHr} = hrSlice.actions
export default hrSlice.reducer