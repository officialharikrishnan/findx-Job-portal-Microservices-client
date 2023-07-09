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

        console.log(e,"err catch")
    }
}
export const REGISTER_API  =async (data:RegisterData)=> {
    try{
        console.log(" called>>>>>",data)
        return Axios().post('/api/user/register',data)
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
export const GOOGLE_REG_API = async (data:any)=>{
    try{
        return Axios().post('/api/user/googleReg',data)
    }catch(e){

    }
}
export const GOOGLE_LOG_API = async (data:any)=>{
    try{
        return Axios().post('/api/user/googleLogin',data)
    }catch(e){

    }
}
export const USER_EXIST_CHECK = async (data:any)=>{
    try{
        return Axios().post('/api/user/userCheck',data)
    }catch(e){

    }
}
export const ACCOUNT_FIND = async (data:any)=>{
    try{
        return Axios().post('/api/user/findAcc',data)
    }catch(e){

    }
}
export const UPDATE_PROFILE = async (data:any)=>{
    console.log(data,"update profile api")
    try{
        return await Axios().post('/api/profile/update',data)
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
export const HR_EXIST_CHECK = async (data:any)=>{
    try{
        return Axios().post('/api/hr/hrCheck',data)
    }catch(e){

    }
}

export const HR_GOOGLE_REG_API = async (data:any)=>{
    try{
        return Axios().post('/api/hr/googleReg',data)
    }catch(e){

    }
}
export const HR_GOOGLE_LOG_API = async (data:any)=>{
    try{
        return Axios().post('/api/hr/googleLogin',data)
    }catch(e){

    }
}
export const HR_ACCOUNT_FIND = async (data:any)=>{
    try{
        return Axios().post('/api/hr/findAcc',data)
    }catch(e){

    }
}
export const JOB_CREATE = async (data:any) => {
    try{
        return Axios().post('/api/job/create',data)
    }catch(e){

    }
}