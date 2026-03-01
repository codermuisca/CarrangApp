// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "carrangapp.firebaseapp.com",
  projectId: "carrangapp",
  storageBucket: "carrangapp.firebasestorage.app",
  messagingSenderId: "562780981106",
  appId: "",
  measurementId: "G-8LSZWMCGTP",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
