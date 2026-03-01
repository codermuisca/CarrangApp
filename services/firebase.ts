// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkvHIXV1NR2t6_FQV-7baEq2TEinD8-3I",
  authDomain: "carrangapp.firebaseapp.com",
  projectId: "carrangapp",
  storageBucket: "carrangapp.firebasestorage.app",
  messagingSenderId: "562780981106",
  appId: "1:562780981106:web:670261e5a8629d9af23feb",
  measurementId: "G-8LSZWMCGTP",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
