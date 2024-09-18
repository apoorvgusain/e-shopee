// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB586X9SBvIBfY5eGRPAjRVlYNawuj4tXA",
  authDomain: "e-shop-86050.firebaseapp.com",
  projectId: "e-shop-86050",
  storageBucket: "e-shop-86050.appspot.com",
  messagingSenderId: "836683874415",
  appId: "1:836683874415:web:329dfacbec1f9057ae0d9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
