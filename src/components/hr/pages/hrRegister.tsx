import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useValidate, RegisterData } from "../../../formValidation/hrRegister";
import { HR_EXIST_CHECK } from "../../../utils/methods/post";
import { app } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import Alert from "../../../utils/custom/Alert";
import { useDispatch } from "react-redux";
import { createHr } from "../../../store/tempHrSlice";
import GoogleSignupHr from "../sections/hrGoogleReg";

const HrRegister = () => {
  const {register,handleSubmit,errors} = useValidate()
  const auth = getAuth(app);
  const navigate = useNavigate()
  const [phone,setPhone]=useState('')
  const [alert,setAlert]=useState(false)
  const dispatch=useDispatch()
  const formSubmit =async (data:RegisterData)=>{
    console.log("hrData>>>>>>",data)
    const hrExist = await HR_EXIST_CHECK(data) 
    if(!hrExist?.data.hrExist){
      dispatch(createHr(data))
      console.log(hrExist,"hr??")
      onSignUp()
    }else{
      setAlert(true)
    }
  }

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'visible',
            'callback': (response:any) => {
                onSignUp()
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth);
    }
}

 function onSignUp() {
  // e.preventDefault()
  onCaptchaVerify()
  console.log(phone,"phone>>>")
  const appVerify = window.recaptchaVerifier

    const phoneNumber = `+91${phone}`
  
  signInWithPhoneNumber(auth, phoneNumber, appVerify)
      .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          navigate('/hr-verify')
          // ...
      }).catch((error) => {
          console.log(error);
          setAlert(true)
          // Error; SMS not sent
          // ...
      });
 }

  
  
  return (
    <div className="">
      <div className="antialiased bg-gradient-to-br from-sky-100 to-white">
        <div className="container px-6  mx-auto">
          <div className="flex flex-col text-center md:text-left md:flex-row h-full justify-evenly md:items-center">
            <div className="flex flex-col w-full">
              <div>
                <svg
                  className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <h1 className="text-5xl text-gray-800 font-bold">HR Area</h1>
              <p className="w-8/12 mx-auto md:mx-0 text-gray-500">
                Treat your employees right, so they won't use your internet to
                search for a new job.
              </p>
            </div>
            <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0 my-8">
              <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                  SignUp
                </h2>
                <form onSubmit={handleSubmit(formSubmit)} className="w-full">
                    <div id="input" className="flex flex-col w-full my-5">
                      <label className="text-gray-500 mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Please insert your username"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                        {...register('firstName')}
                      />
                      {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                    </div>
                    <div id="input" className="flex flex-col w-full my-5">
                      <label className="text-gray-500 mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Please insert your username"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                        {...register('lastName')}
                      />
                      {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}

                    </div>

                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Please insert your phone"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register('phone')}
                      onChange={(e)=>{setPhone(e.target.value)}}
                    />
                      {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}

                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Company Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Please insert your email"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register('email')}
                    />
                    {errors.email && <span className="text-red-600 text">{errors.email.message}</span> }
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="Please insert your company name"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register('companyName')}
                    />
                      {errors.companyName && <span className="text-red-500">{errors.companyName.message}</span>}

                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Please insert your password"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Please insert your password"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register('confirmPassword')}
                    />
                      {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      type="submit"
                      className="w-full py-4 bg-sky-600 rounded-lg text-green-100"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <div className="font-bold">SignUp</div>
                      </div>
                    </button>
                    <div className="flex justify-evenly mt-5">
                      <Link
                        to={"/hr-login"}
                        className="w-full text-center font-medium text-gray-500"
                      >
                        Already have an account?
                      </Link>
                      
                    </div>
                  </div>
                </form>
                    <GoogleSignupHr/>
                <div id="recaptcha-container"></div>
              </div>
          {alert && <Alert color="bg-orange-200" border="border-orange-500" message="Accound already exists"/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;
