// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXKbx634X3Q8dcMiXjHseVzQiAFMvmSdY",
  authDomain: "reputa360.firebaseapp.com",
  projectId: "reputa360",
  storageBucket: "reputa360.appspot.com",
  messagingSenderId: "37758184858",
  appId: "1:37758184858:web:1d40d66b1441f2bf6f9e23",
  measurementId: "G-9MR1JLWZ81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);