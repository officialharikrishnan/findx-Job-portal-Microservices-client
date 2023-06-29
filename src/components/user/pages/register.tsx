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
import Alert from "../../../utils/alert/Alert";
const Register = () => {
  const auth = getAuth(app);
  const appVerifier = window.recaptchaVerifier;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phone,setPhone]=useState('')
  const [alert,setAlert]=useState(false)
  const {handleSubmit,register,errors} = useValidate()
  const formSubmit =async (data:RegisterData) => {
    const user:any = await USER_EXIST_CHECK(data)
    console.log(user)
    if(!user.data.userExist){
      dispatch(createUser(data))
      onSignUp()
    }else{
      // alert
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
          navigate('/verify')
          // ...
      }).catch((error) => {
          console.log(error);
          // Error; SMS not sent
          // ...
      });
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
              <Link to={"/login"}
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
                  <button
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Register
                  </button>
                </div>
              </form>
              <div id="recaptcha-container"></div>
              <GoogleSignup/>
            </div>
          </div>  
          {alert && <Alert color="orange" message="Accound already exists"/>}
          
        </div>
      </div>
    </div>
  );
};

export default Register;
