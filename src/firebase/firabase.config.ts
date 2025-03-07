import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMvKp7X9pJXD246MudkUVaAlXWbJOMlGo",
  authDomain: "voda-ai.firebaseapp.com",
  projectId: "voda-ai",
  storageBucket: "voda-ai.firebasestorage.app",
  messagingSenderId: "349851057081",
  appId: "1:349851057081:web:ffee506fcd849e47871468",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
