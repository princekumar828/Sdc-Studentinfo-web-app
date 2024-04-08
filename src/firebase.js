// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeySeeejIlnFto5OiIeqExFNI8Jo62de8",
  authDomain: "student-b9d65.firebaseapp.com",
  projectId: "student-b9d65",
  storageBucket: "student-b9d65.appspot.com",
  messagingSenderId: "486607685538",
  appId: "1:486607685538:web:87402469ad40c176f2d4fb",
  measurementId: "G-LF3T58QXJY"
};

//

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service

export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);