import { Link, useNavigate } from "react-router-dom";
import { RegisterData, useValidate } from "../../../formValidation/register";
import { REGISTER_API, USER_EXIST_CHECK } from "../../../utils/methods/post";
import { useDispatch } from "react-redux";
import { insert } from "../../../store/userSlice";
import GoogleSignup from "../sections/googleReg";
import { useState } from "react";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../../../config/firebase";
import { createUser } from "../../../store/tempUserSlice";
import Alert from "../../../utils/custom/Alert";
import useFirebaseMobileOTP from "../../../utils/custom/firebaseAuth";
const Register = () => {
  const auth = getAuth(app);
  const appVerifier = window.recaptchaVerifier;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phone,setPhone]=useState('')
  const [alert,setAlert]=useState(false)
  const {handleSubmit,register,errors} = useValidate()
  const [submit,setSubmit]=useState(false)

  const {sendOTP} = useFirebaseMobileOTP()
  const formSubmit =async (data:RegisterData) => {
    setSubmit(true)
    const user:any = await USER_EXIST_CHECK(data)
    console.log(user)
    if(!user.data.userExist){
      dispatch(createUser(data))
      sendOTP(phone,'user/verify')
    }else{
      setSubmit(false)
      // alert
      setAlert(true)

    }

  }
  

  return (
    <div>
      <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-50 ">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col ">
            <div className="self-center text-xl font-light text-gray-800 sm:text-2xl ">
              Create a new account
            </div>
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
              Already have an account ?
              <Link to={"/user/login"}
                className="text-sm text-blue-500 underline hover:text-blue-700"
              >
                Sign in
              </Link>
            </span>
            <div className="mt-20">
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="email"
                      id="create-account-pseudo"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Email"
                      {...register('email')}
                    />
                    {errors.email ? <span className="text-red-600 text">{errors.email.message}</span> : ""}
                  </div>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-first-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="First name"
                      {...register('firstName')}
                    />
                    {errors.firstName ? <span className="text-red-600 text">{errors.firstName.message}</span> : ""}
                  </div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-last-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Last name"
                      {...register('lastName')}
                      />
                      {errors.lastName ? <span className="text-red-600 text">{errors.lastName.message}</span> : ""}
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="tel"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Phone"
                      {...register('phone')}
                      onChange={(e)=>{setPhone(e.target.value)}}
                    />
                    {errors.phone ? <span className="text-red-600 text">{errors.phone.message}</span> : ""}
                  </div>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className=" relative ">
                    <input
                      type="password"
                      id="create-account-first-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="password"
                      {...register('password')}
                    />
                      {errors.password ? <span className="text-red-600 text">{errors.password.message}</span> : ""}
                  </div>
                  <div className=" relative ">
                    <input
                      type="password"
                      id="create-account-last-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="confirmPassword"
                      {...register('confirmPassword')}
                      />
                      {errors.confirmPassword ? <span className="text-red-600 text">{errors.confirmPassword.message}</span> : ""}
                  </div>
                </div>
                <div className="flex w-full my-4">
                {!submit ? <button
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Register
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
              <div id="recaptcha-container"></div>
              <GoogleSignup/>
            </div>
          </div>  
          {alert && <Alert color="bg-orange-200" border="border-orange-500" message="Accound already exists"/>}
          
        </div>
      </div>
    </div>
  );
};

export default Register;
