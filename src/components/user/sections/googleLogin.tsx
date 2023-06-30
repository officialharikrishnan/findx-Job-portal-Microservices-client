import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { insertEmail } from "../../../store/emailSlice";
import { GOOGLE_LOG_API } from "../../../utils/methods/post";
import { insert } from "../../../store/userSlice";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";
import { useState } from "react";
import Alert from "../../../utils/alert/Alert";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [alert,setAlert]=useState(false)
  async function doSignup() {
    console.log(auth)
    signInWithPopup(auth, provider)
      .then(async(result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user,">>>>user")
        
        const res:any =await  GOOGLE_LOG_API({email:user.email})
        console.log(res,"google res")
        if(res && res.status === 200){
            dispatch(insert(res.data.user))
            cookieHandler().setCookie('findx',res.data.token)
            navigate("/home")
        }else{
            setAlert(true)
            console.log("user not exist")
        }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode,errorMessage,email,credential)
      });
  }
  return (
    <div>
        {alert && <Alert color="bg-red-300" border="border-red-500" message="somthing went wrong please try again after sometime"/>}
      <button
      onClick={doSignup}
        aria-label="Continue with google"
        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100"
      >
        <img
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in_2-svg2.svg"
          alt="google"
        />
        <p className="text-base font-medium ml-4 text-gray-700">
          Continue with Google
        </p>
      </button>
    </div>
  );
}

export default GoogleLogin;
