import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HR_REGISTER_API } from "../../../utils/methods/post";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../../formValidation/hrRegister";
import { insertHr } from "../../../store/hrSlice";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";
interface tempHr{
  tempHr:{
    hr:RegisterData
  }
}

const HrOtp = () => {
  const hrData:RegisterData = useSelector((store:tempHr) => store.tempHr.hr);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [otp,setOtp]=useState('')
  const[submit,setSubmit]=useState(false)

  console.log("before>>>",hrData)
  function onOtpVerify(e:any) {
    e.preventDefault()
    setSubmit(true)
    console.log("verify",hrData)
  
    window.confirmationResult.confirm(otp).then(async () => {
      try{
        console.log("otp>>>>data>>>", hrData)
        const res =await HR_REGISTER_API(hrData)
        console.log(res?.status,">>>>>>>>>>>>");
        if(res?.status === 200){
          dispatch(insertHr(res.data))
        cookieHandler().setCookie('findx-hr',res.data.token)
          navigate("/hr/dashboard")
        }else{
          setSubmit(false)
        }
      }catch(err){
        console.log(err);
        setSubmit(false)

        
      }
    }).catch((err:any) => {
        console.log(err, "fail");
        setSubmit(false)

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
                <p>We have sent a code to your {hrData && hrData.phone}</p>
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
                      {!submit ? <button
                      onClick={e=>onOtpVerify(e)}
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Verify
                  </button> :
                  <button
                    disabled
                    type="button"
                    className="text-white w-full bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 inline-block items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Verifying...
                  </button>}
                      </div>
  
                      {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p>{" "}
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div> */}
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

export default HrOtp;
