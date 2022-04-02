import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWgmmZQlDypMSuKqIwt-iSDo_th0KxTFs",
  authDomain: "chatgen-a5512.firebaseapp.com",
  projectId: "chatgen-a5512",
  storageBucket: "chatgen-a5512.appspot.com",
  messagingSenderId: "826991074169",
  appId: "1:826991074169:web:c61544d618d2e1590aeda8",
  measurementId: "G-S3118RVTR7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db = getFirestore();

// const usersRef = collection(db, "users");


// export const auth = getAuth();

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.DOMAIN + ".firebaseapp.com",
//     projectId: process.env.DOMAIN,
//     storageBucket: process.env.DOMAIN + ".appspot.com",
//     messagingSenderId: process.env.SENDERID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MS_ID,
//   };
