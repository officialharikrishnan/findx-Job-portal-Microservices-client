import { useEffect, useState } from "react";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
const useFirebaseMobileOTP = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            // reCAPTCHA solved
          },
          "expired-callback": () => {
            // reCAPTCHA expired
          },
        },
        auth
      );
      setRecaptchaVerifier(verifier);
    }
  }, []);

  const sendOTP = async (phoneNumber: any, redirect?: string) => {
    console.log(phoneNumber,">>> opt phone")
    if (phoneNumber.toString().substring(0, 3) !== "+91") {
      phoneNumber = "+91" + phoneNumber;
    }
    try {
      const appVerifier = recaptchaVerifier;
      await signInWithPhoneNumber(auth, phoneNumber, appVerifier!).then(
        (result) => {
          window.confirmationResult = result;
          if (redirect) {
            navigate(`/${redirect}`);
          }
          // OTP message sent successfully
        }
      );
    } catch (error) {
      console.error(error);
      // Failed to send OTP message
    }
  };

  return { sendOTP };
};

export default useFirebaseMobileOTP;
