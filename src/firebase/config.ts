import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDx1u0bmxwrdb-jvF7qa19b5q3uoHPndvE",
  authDomain: "fir-project-5df44.firebaseapp.com",
  projectId: "fir-project-5df44",
  storageBucket: "fir-project-5df44.firebasestorage.app",
  messagingSenderId: "54565729724",
  appId: "1:54565729724:web:94115806eba537ad84e7b9",
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
