import React, { useState } from "react";
import {
  HrRegisterData,
  useValidate,
} from "../../../formValidation/hrRegisterViaEmail";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../../utils/custom/Alert";
import { useDispatch, useSelector } from "react-redux";
import {  HR_GOOGLE_REG_API } from "../../../utils/methods/post";
import { insertHr } from "../../../store/hrSlice";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";

interface Store {
  email: {
    email: "";
  };
}
const HrProfileComplete = () => {
  const { handleSubmit, register, errors } = useValidate();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data: string = useSelector((store: Store) => store.email.email);
  const formSubmit = async (data: HrRegisterData) => {
    const res = await HR_GOOGLE_REG_API(data);
    if (res?.status !== 200) {
      setAlert(true);
    } else {
      dispatch(insertHr(res.data));
      cookieHandler().setCookie("findx-hr", res.data.token);
      navigate("/hr/hr-dashboard");
    }
  };
  return (
    <div>
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
                  Complete your profile
                </h2>
                <form onSubmit={handleSubmit(formSubmit)} className="w-full">
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Please insert your first name"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Please insert your last name"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>

                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Please insert your phone"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Company Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Please insert your email"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register("email")}
                      value={data}
                    />
                    {errors.email && (
                      <span className="text-red-600 text">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-500 mb-2">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="Please insert your company name"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      {...register("companyName")}
                    />
                    {errors.companyName && (
                      <span className="text-red-500">
                        {errors.companyName.message}
                      </span>
                    )}
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
                     
                    </div>
                  </div>
                </form>
                <div id="recaptcha-container"></div>
              {alert && (
                <Alert
                  color="bg-orange-200"
                  border="border-orange-500"
                  message="Accound already exists, please try to"
                  redirect="hr-login"
                  redirectText="Login"
                />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrProfileComplete;
