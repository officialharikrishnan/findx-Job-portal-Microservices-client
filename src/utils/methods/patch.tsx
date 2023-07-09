import { RegisterData } from "../../formValidation/register";
import { RegisterData as HRReg } from "../../formValidation/hrRegister";
import { RegisterData as HRLog } from "../../formValidation/hrLogin";
import { Axios } from "../baseUrl/api";

/**************** USER API ****************/

export const UPDATE_PASSWORD = async (data:any)=>{
    try{
        return Axios().patch('/api/user/updatePass',data)
    }catch(e){

    }
}


/**************** HR API ****************/

export const HR_UPDATE_PASSWORD = async (data:any)=>{
    try{
        return Axios().patch('/api/hr/updatePass',data)
    }catch(e){

    }
}


export const HR_UPDATE_PROFILE = async (data:any)=>{
    try{
        return Axios().patch('/api/hr/updateprofile',data)
    }catch(e){

    }
}
