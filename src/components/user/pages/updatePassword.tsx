import React, { useEffect, useReducer, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import Info from "../../../utils/custom/Info";
import { ACCOUNT_FIND } from "../../../utils/methods/post";
import Alert from "../../../utils/custom/Alert";
import useFirebaseMobileOTP from "../../../utils/custom/firebaseAuth";
import { UPDATE_PASSWORD } from "../../../utils/methods/patch";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [account, setAccoount] = useState<any>();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  const navigate = useNavigate();
  const { sendOTP } = useFirebaseMobileOTP();
  const initialState = {
    finding: false,
    alert: false,
    otpSend: false,
    otpVerified: false,
    emailVerify: false,
    inputLoaded: false,
    submitted: false,
    error: false,
    invaliedOtp: false,
    success:false
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
    const regX=/^(?=.*[A-Z])/

    if(!regX.test(password)){
        setError('password must contain atleast one uppercase')
    }
    if(password.length<5){
        setError("Password length min 5")
    }
    if(password.length>=5 && regX.test(password)){
        setError("")
    }

  },[password])

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "alert-on": {
        return {
          ...state,
          alert: true,
        };
      }
      case "find-on": {
        return {
          ...state,
          finding: true,
        };
      }
      case "stop-find": {
        return {
          ...state,
          finding: false,
        };
      }
      case "stop-alert": {
        return {
          ...state,
          alert: false,
        };
      }
      case "otp-send": {
        return {
          ...state,
          otpSend: true,
        };
      }
      case "otp-verified": {
        return {
          ...state,
          otpVerified: true,
        };
      }
      case "email-verify": {
        return {
          ...state,
          emailVerify: true,
        };
      }
      case "input-load": {
        return {
          ...state,
          inputLoaded: true,
        };
      }
      case "submit": {
        return {
          ...state,
          submitted: true,
        };
      }
      case "error-on": {
        return {
          ...state,
          error: true,
        };
      }
      case "invalied-on": {
        return {
          ...state,
          invaliedOtp: true,
        };
      }
      case 'success':{
        return {
            ...state,
            success:true
        }
      }
    }
    throw Error("Unknown action: " + action.type);
  }

  const findAccound = async () => {
    dispatch({ type: "find-on" });
    const res = await ACCOUNT_FIND({ email: email });
    console.log(res);
    if (res?.status === 200) {
      setAccoount(res?.data);
      dispatch({ type: "stop-alert" });
      dispatch({ type: "stop-find" });
      console.log(res.data);

      if (res.data.emailVerified) {
        dispatch({ type: "email-verify" });
        // need to verify by email
      } else {
        // verifying by phone
        sendOTP(res.data.phone);
        dispatch({ type: "otp-send" });
      }
    } else {
      dispatch({ type: "alert-on" });
      dispatch({ type: "stop-find" });
    }
  };
  const otpVerify = () => {
    window.confirmationResult
      .confirm(otp)
      .then(async () => {
        dispatch({ type: "otp-verified" });
        dispatch({ type: "input-load" });
      })
      .catch((err: any) => {
        dispatch({ type: "invalied-on" });
      });
  };
  const changePasswordHandler = async () => {
    dispatch({ type: "submit" });
    const res = await UPDATE_PASSWORD({ email, password });
    if (res?.status === 200) {
        dispatch({type:'success'})
        setTimeout(()=>{
            navigate("/login");
        },2000)
    } else {
      dispatch({ type: "error-on" });
    }
  };

  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-2xl">
                <p>Forgot Password</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                {/* <p>We have sent a code to your {userData && userData.phone}</p> */}
              </div>
            </div>
            <div id="recaptcha-container"></div>

            <div>
              <form action="">
                <div className="flex flex-col mb-2">
                  <div className=" relative">
                    <p className="text-gray-600">Find Account</p>
                    <div className="flex flex-row">
                      <input
                        type="email"
                        id="create-account-pseudo"
                        className=" rounded-l  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <Button
                        className="rounded-l border-none p-1"
                        onClick={findAccound}
                      >
                        {state.finding ? (
                          <>
                            {" "}
                            <Spinner aria-label="Spinner button example" />
                            <span className="pl-3">Loading...</span>
                          </>
                        ) : (
                          <span className="pl-3">Find Account</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {account && (
                  <div
                    className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">
                        {account && account.email} account found
                      </span>
                      {state.emailVerify ? (
                        <ul className="mt-1.5 ml-4 list-disc list-inside">
                          <li>Email is verified in this account</li>
                          <li>The OTP will send to this email</li>
                        </ul>
                      ) : (
                        <ul className="mt-1.5 ml-4 list-disc list-inside">
                          <li>Email is not verified in this account</li>
                          <li>
                            The OTP will send to the phone number xxxxxxxx
                            {account &&
                              account.phone.toString().substring(8, 10)}
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                {state.alert && (
                  <Alert
                    color="bg-orange-200"
                    border="border-orange-500"
                    message="account not found"
                  />
                )}
                {state.error && (
                  <Alert
                    color="bg-red-200"
                    border="border-red-500"
                    message="Somthing went wrong please try again later"
                  />
                )}

                {state.otpSend && (
                  <div className=" relative mt-10 ">
                    <p className="text-gray-600">Enter OTP</p>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        id="create-account-first-name"
                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base "
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <Button
                        className="rounded-l border-none p-1"
                        onClick={otpVerify}
                      >
                        {state.finding && (
                          <>
                            {" "}
                            <Spinner aria-label="Spinner button example" />
                            <span className="pl-3">verifying...</span>
                          </>
                        )}
                        {state.otpVerified && (
                          <>
                            {" "}
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span className="pl-3">Verified</span>
                          </>
                        )}
                        {!state.finding && !state.otpVerified && (
                          <>
                            {" "}
                            <svg
                              className="w-5 h-5 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                            <span className="pl-3">Verify</span>
                          </>
                        )}
                      </Button>
                    </div>
                    {state.invaliedOtp && (
                      <Alert
                        color="bg-red-200"
                        border="border-red-500"
                        message="Invalied OTP"
                      />
                    )}
                  </div>
                )}
                {state.otpVerified && (
                  <div className="flex flex-col mb-2">
                    <div className=" relative">
                      <p className="text-gray-600">New Password</p>
                      <div className="flex flex-row">
                        <input
                          type="email"
                          id="create-account-pseudo"
                          className=" rounded-l  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                          className="rounded-l border-none p-1"
                          onClick={changePasswordHandler}
                        >
                          {state.submitted && !state.success && (
                            <>
                              {" "}
                              <Spinner aria-label="Spinner button example" />
                              <span className="pl-3">wait...</span>
                            </>
                          )}
                          {state.inputLoaded && !state.submitted && (
                            <>
                              {" "}
                              <span className="pl-3">Submit</span>
                            </>
                          )}
                          {state.submitted && state.success && (
                            <>
                              {" "}
                              <span className="pl-3">Done</span>
                            </>
                          )}
                        </Button>
                      </div>
                      {error && <span className="text-red-500">{error}</span>}
                    </div>
                  </div>
                )}
              </form>
              {state.success && <div
                className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Success </span> Password has been changed
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
