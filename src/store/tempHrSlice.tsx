import { createSlice } from "@reduxjs/toolkit";

const tempHrSlice = createSlice({
    name:'hr',
    initialState:{
        hr:{}
    },
    reducers:{
        createHr:(state,action)=>{
            state.hr=action.payload
        }
    }
})

export const {createHr} = tempHrSlice.actions
export default tempHrSlice.reducer