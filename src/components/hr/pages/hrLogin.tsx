import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useValidate,RegisterData } from '../../../formValidation/hrLogin'
import { HR_LOGIN_API } from '../../../utils/methods/post'
import { useDispatch } from 'react-redux'
import { insertHr } from '../../../store/hrSlice'
import Cookies from 'universal-cookie';
import GoogleSignInHr from '../sections/hrGoogleLogin'
const cookies = new Cookies();
const HrLogin = () => {
  const {register,handleSubmit,errors} = useValidate()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submit,setSubmit]=useState(false)
  const formSubmit =async (data:RegisterData) => {
    setSubmit(true)
      const res =await HR_LOGIN_API(data)
      if(res?.status === 200){
        dispatch(insertHr(res.data.hr))
        cookies.set('findx-hr',res.data.token, { path: '/' })
        navigate("/hr/hr-dashboard")
      }else{
        setSubmit(false)
      }
      console.log(res)
  }
  return (
    <div>
        <body className="antialiased bg-gradient-to-br from-sky-100 to-white">
    <div className="container px-6 mx-auto">
      <div
        className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
      >
        <div className="flex flex-col w-full mt-24">
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
          <p className="w-8/12  mx-auto md:mx-0 text-gray-500">
          Treat your employees right, so they won't use your internet to search for a new job.
          </p>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
              Login
            </h2>
            <form onSubmit={handleSubmit(formSubmit)} className="w-full">
              <div id="input" className="flex flex-col w-full my-5">
                <label  className="text-gray-500 mb-2"
                  >Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Please insert your phone"
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  {...register('phone')}
                />
                {errors.phone && <span className='text-red-500'>{errors.phone.message}</span>}
              </div>
              <div id="input" className="flex flex-col w-full my-5">
                <label  className="text-gray-500 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Please insert your password"
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  {...register('password')}
                />
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

              </div>
              <div id="button" className="flex flex-col w-full my-5">
              {!submit ? <button
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login
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
                    Please wait...
                  </button>}
                <div className="flex justify-evenly mt-5">
                  <a
                    href="#"
                    className="w-full text-center font-medium text-gray-500"
                    >Recover password!</a>
                  <Link
                  to={"/hr/hr-register"}
                    className="w-full text-center font-medium text-gray-500"
                    >Register!</Link >
                </div>
              </div>
            </form>
            <GoogleSignInHr/>
          </div> 
        </div>
      </div>
    </div>
  </body>





    </div>
  )
}

export default HrLogin