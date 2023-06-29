import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useValidate,RegisterData } from '../../../formValidation/hrLogin'
import { HR_LOGIN_API } from '../../../utils/methods/post'
import { useDispatch } from 'react-redux'
import { insertHr } from '../../../store/hrSlice'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const HrLogin = () => {
  const {register,handleSubmit,errors} = useValidate()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formSubmit =async (data:RegisterData) => {
      const res =await HR_LOGIN_API(data)
      if(res?.status === 200){
        dispatch(insertHr(res.data.hr))
        cookies.set('findx-hr',res.data.token, { path: '/' })
        navigate("/hr-dashboard")
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
              Sigin
            </h2>
            <form onSubmit={handleSubmit(formSubmit)} className="w-full">
              <div id="input" className="flex flex-col w-full my-5">
                <label  className="text-gray-500 mb-2"
                  >Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Please insert your username"
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
                    <div className="font-bold">Sigin</div>
                  </div>
                </button>
                <div className="flex justify-evenly mt-5">
                  <a
                    href="#"
                    className="w-full text-center font-medium text-gray-500"
                    >Recover password!</a>
                  <Link
                  to={"/hr-register"}
                    className="w-full text-center font-medium text-gray-500"
                    >Singup!</Link >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>





    </div>
  )
}

export default HrLogin