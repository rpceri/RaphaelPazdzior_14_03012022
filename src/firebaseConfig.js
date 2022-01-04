// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
//import { getAnalytics } from "firebase/analytics";
//import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYFPzh8BtoxrnGddSJXjlWuXkzNvcUsZ4",
  authDomain: "react-hrnet.firebaseapp.com",
  projectId: "react-hrnet",
  storageBucket: "react-hrnet.appspot.com",
  messagingSenderId: "276014455664",
  appId: "1:276014455664:web:c3cae402107ee4891d0db5",
  measurementId: "G-MFF5LBSSCQ"
};

// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);
const db = getFirestore(firebaseInit);

export default db ;