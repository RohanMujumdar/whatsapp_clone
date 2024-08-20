// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//Firestore step-1
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
//auth-step-1
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4WtcZQ7vJmrqNEibm51j6s9y21ijBVWo",
  authDomain: "whatsapp-clone-b6f61.firebaseapp.com",
  projectId: "whatsapp-clone-b6f61",
  storageBucket: "whatsapp-clone-b6f61.appspot.com",
  messagingSenderId: "143675904550",
  appId: "1:143675904550:web:48b27b93fa11d9a6aacce7",
  measurementId: "G-NM5SFMD81R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth-step-2
const auth =getAuth(app);
const db=getFirestore();
const storage=getStorage();

export {auth,db,storage}