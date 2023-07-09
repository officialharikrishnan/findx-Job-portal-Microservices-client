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
  apiKey: "AIzaSyAs39UEj74sHX3ExRWKmPQBE5DOG2mqst0",
  authDomain: "backup-391e1.firebaseapp.com",
  projectId: "backup-391e1",
  storageBucket: "backup-391e1.appspot.com",
  messagingSenderId: "1087296783453",
  appId: "1:1087296783453:web:07923d55592042597f39b4"
};
console.log(firebaseConfig)

export const app = initializeApp(firebaseConfig);
