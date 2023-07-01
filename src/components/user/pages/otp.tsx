import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_API } from "../../../utils/methods/post";
import { insert } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../../formValidation/register";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";
interface tempUSer{
  tempUser:{
    user:RegisterData
  }
}

const Otp = () => {
  const userData:RegisterData = useSelector((store:tempUSer) => store.tempUser.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [otp,setOtp]=useState('')
  console.log("before>>>",userData)
  function onOtpVerify(e:any) {
    e.preventDefault()
    console.log("verify",userData)
  
    window.confirmationResult.confirm(otp).then(async () => {
      try{
        console.log("otp>>>>data>>>", userData)
        const res =await REGISTER_API(userData)
        console.log(res?.status,">>>>>>>>>>>>");
        if(res?.status === 200){
          dispatch(insert(res.data))
        cookieHandler().setCookie('findx',res.data.token)

          navigate("/user/home")
        }else{
          
        }
      }catch(err){
        console.log(err);
        
      }
    }).catch((err:any) => {
        console.log(err, "fail");
    })
  }
  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your {userData && userData.phone}</p>
              </div>
            </div>

            <div>
            <form action="" method="post">
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center p-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e)=>{setOtp(e.target.value)}}
                        />
                      
                    </div>
  
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button onClick={(e)=>onOtpVerify(e)} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none p-3 bg-gray-700 border-none text-white text-sm shadow-sm">
                          Verify Account
                        </button>
                      </div>
  
                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
