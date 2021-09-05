// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqFKNW_fEtMUNr3BtGRyyO-PCkatlixzk",
  authDomain: "disney-clone-5d002.firebaseapp.com",
  projectId: "disney-clone-5d002",
  storageBucket: "disney-clone-5d002.appspot.com",
  messagingSenderId: "71098379418",
  appId: "1:71098379418:web:8b49cd2c06e328a3018323",
  measurementId: "G-HBSTBJNMZW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);


export {auth, provider, storage};
export {firebaseApp}
export default db;