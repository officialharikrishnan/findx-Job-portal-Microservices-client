import { RegisterData } from "../../formValidation/register";
import { RegisterData as HRReg } from "../../formValidation/hrRegister";
import { RegisterData as HRLog } from "../../formValidation/hrLogin";
import { Axios } from "../baseUrl/api";


/*********************  USER API  ************************/

export const LOGIN_API  =async(data:any)=> {
    try{
        console.log(" called>>>>>",data)
        return Axios().post('/api/user/login',data)
    }catch(e){
        console.log(e,"err")
    }
}
export const REGISTER_API  =async (data:RegisterData)=> {
    try{
        console.log(" called>>>>>",data)
        return Axios().post('/api/user/register',{...data})
    }catch(e){
        console.log(e,"err")
    }
}
export const CREATE_POST = async (data:any)=>{
    try{
        console.log(" called>>>>>")
        return Axios().post('/api/post/create',data)
    }catch(e){
        console.log(e)
    }
}
export const GOOGLE_API = async (data:any)=>{
    try{
        return Axios().post('/api/user/google',data)
    }catch(e){

    }
}
export const USER_EXIST_CHECK = async (data:any)=>{
    try{
        return Axios().post('/api/user/userCheck',data)
    }catch(e){

    }
}

/*********************  HR API  ************************/


export const HR_REGISTER_API = async (data:HRReg)=>{
    try{
        return Axios().post('/api/hr/register',data)
    }catch(e){

    }
}
export const HR_LOGIN_API = async (data:HRLog)=>{
    try{
        return Axios().post('/api/hr/login',data)
    }catch(e){

    }
}
