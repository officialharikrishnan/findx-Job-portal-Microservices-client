import React, { useState } from "react";
import GoogleSignup from "../sections/googleReg";
import { Link, useNavigate } from "react-router-dom";
import { useValidate } from "../../../formValidation/login";
import { LOGIN_API } from "../../../utils/methods/post";
import { useDispatch } from "react-redux";
import { insert } from "../../../store/userSlice";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const {handleSubmit,errors,register} = useValidate()
  const [loginError,setLoginError]=useState(false)
  
  const formSubmit = async (data:any) => {
    console.log("called");
    
    try {
      const res = await LOGIN_API(data)
      if(res?.status === 200){
        dispatch(insert(res.data.user))
        cookies.set('findx',res.data.token, { path: '/' })
        navigate("/home")
      }else{
        navigate('/login')
      }
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(error)
      setLoginError(true)
      // Handle any errors that occur during the API call
    }

  }
  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="self-center text-xl font-light text-gray-600 sm:text-2xl">
              Login To Your Account
            </div>
            {loginError && <p className="text-red-500">Invalid user</p>}
            <div className=" item-center">
            <GoogleSignup/>
            </div>
            <div className="">
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col mb-2">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      id="Phone"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Phone"
                      {...register("phone")}
                    />
                  </div>
                      {errors.phone ? <span className="text-red-600 text">{errors.phone.message}</span> : ""}
                </div>
                <div className="flex flex-col mb-6">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="password"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Your password"
                      {...register('password')}
                    />
                  </div>
                      {errors.password ? <span className="text-red-600 text">{errors.password.message}</span> : ""}
                </div>
                <div className="flex items-center mb-6 -mt-4">
                  <div className="flex ml-auto">
                    <Link
                      to={"/"}
                      className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                    >
                      Forgot Your Password?
                    </Link>
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login
                  </button>

                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-6">
              <Link to={"/register"}
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 "
              >
                <span className="ml-2">You don&#x27;t have an account?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
