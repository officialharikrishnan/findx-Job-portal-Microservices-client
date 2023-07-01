import { RegisterData } from "../../formValidation/register";
import { RegisterData as HRReg } from "../../formValidation/hrRegister";
import { RegisterData as HRLog } from "../../formValidation/hrLogin";
import { Axios } from "../baseUrl/api";

export const UPDATE_PASSWORD = async (data:any)=>{
    try{
        return Axios().patch('/api/user/updatePass',data)
    }catch(e){

    }
}
