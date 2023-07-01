import { initializeApp } from "firebase/app";
declare global {
  interface Window {
      recaptchaVerifier: any;
      confirmationResult:any;
  }
}

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING,
//   appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDFj44Tvl4PueAjpmQoQOKYzMcVyOjdbUM",
  authDomain: "authmanager-43026.firebaseapp.com",
  projectId: "authmanager-43026",
  storageBucket: "authmanager-43026.appspot.com",
  messagingSenderId: "665732300465",
  appId: "1:665732300465:web:91ce3b2e8f11ce8c0cec90"
};

console.log(firebaseConfig)

export const app = initializeApp(firebaseConfig);
