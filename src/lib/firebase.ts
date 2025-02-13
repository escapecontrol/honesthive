import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCg0wnjCSVF7DEJbEd2R9ossW5mMRIY5Mk",
  authDomain: "project-template-e9e34.firebaseapp.com",
  projectId: "project-template-e9e34",
  storageBucket: "project-template-e9e34.firebasestorage.app",
  messagingSenderId: "536170603037",
  appId: "1:536170603037:web:da8e6041d289197349dcf4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
