// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt_9139x3mcvsLr_F-C_gRrMnLA5paZqY",
    authDomain: "chat-app-2f798.firebaseapp.com",
    projectId: "chat-app-2f798",
    storageBucket: "chat-app-2f798.appspot.com",
    messagingSenderId: "100406453394",
    appId: "1:100406453394:web:f48079ccc4e39de65eb24b",
    measurementId: "G-MMV2TKMYTV"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()