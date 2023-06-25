import { RegisterData } from "../../formValidation/register";
import { Axios } from "../baseUrl/api";

export const LOGIN_API  =async(data:any)=> {
    try{
        console.log(" called>>>>>")
        return Axios().post('/api/user/login',{...data})
    }catch(e){
        console.log(e,"err")
    }
}
export const REGISTER_API  =async (data:RegisterData)=> {
    try{
        console.log(" called>>>>>")
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