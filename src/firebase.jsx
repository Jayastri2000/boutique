// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBpUK_LhKECYYwdGyo1-Mmx1B0vSY590mc",
  authDomain: "rishi-boutique.firebaseapp.com",
  projectId: "rishi-boutique",
  storageBucket: "rishi-boutique.firebasestorage.app",
  messagingSenderId: "722913495608",
  appId: "1:722913495608:web:767f782eeacbcd08fc74cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;
