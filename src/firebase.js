// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDjJYga_CKa41lltnLznp5yRV5UfZHCSxc",
  authDomain: "satark-2dc1f.firebaseapp.com",
  databaseURL: "https://satark-2dc1f-default-rtdb.firebaseio.com",
  projectId: "satark-2dc1f",
  storageBucket: "satark-2dc1f.appspot.com",
  messagingSenderId: "18860702476",
  appId: "1:18860702476:web:a51fdaccd60cd9f43a2729",
  measurementId: "G-RFYXTFVK19",
};

//

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service

export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);