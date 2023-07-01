import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useValidate } from "../../../formValidation/login";
import { LOGIN_API } from "../../../utils/methods/post";
import { useDispatch } from "react-redux";
import { insert } from "../../../store/userSlice";
import Cookies from "universal-cookie";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";
import Alert from "../../../utils/custom/Alert";
import GoogleLogin from "../sections/googleLogin";
const cookies = new Cookies();
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, errors, register } = useValidate();
  const [loginError, setLoginError] = useState(false);
  const [submit,setSubmit]=useState(false)

  const formSubmit = async (data: any) => {
    setSubmit(true)
    const res = await LOGIN_API(data);
    console.log(">>>>res>>>", res);
    if (res?.status === 200) {
      
      dispatch(insert(res.data.user));
      cookieHandler().setCookie("findx", res.data.token);
      navigate("/user/home");
    } else {
      setSubmit(false)
      setLoginError(true);
    }
    // Handle the response or perform any necessary actions
  };
  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="self-center text-xl font-light text-gray-600 sm:text-2xl">
              Login To Your Account
            </div>
            <div className=" item-center">
              <GoogleLogin />
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
                  {errors.phone ? (
                    <span className="text-red-600 text">
                      {errors.phone.message}
                    </span>
                  ) : (
                    ""
                  )}
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
                      {...register("password")}
                    />
                  </div>
                  {errors.password ? (
                    <span className="text-red-600 text">
                      {errors.password.message}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex items-center mb-6 -mt-4">
                  <div className="flex ml-auto">
                    <Link
                      to={"/user/forgot"}
                      className="inline-flex text-xs font-thin text-gray-500 sm:text-sm  hover:text-gray-700 dark:hover:text-gray-900"
                    >
                      Forgot Your Password?
                    </Link>
                  </div>
                </div>
                <div className="flex w-full">
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
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center space-x-44 mt-6">
              <Link
                to={"/user/register"}
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 "
              >
                <span className="ml-2">You don&#x27;t have an account?</span>
              </Link>
              <Link
                to={"/"}
                className=" items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 "
              >
                <p className="ml-2 text-gray-950">Back to home</p>
              </Link>
              
            </div>
            
          </div>
          {loginError && (
            <Alert
              color="bg-orange-200"
              border="border-orange-500"
              message="invalied phone or password"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
