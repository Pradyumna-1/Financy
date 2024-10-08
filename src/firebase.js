// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnK7tnw56H3WrkOs3cqntA7J5Grn6yCi8",
  authDomain: "finance-tracker-e4fd8.firebaseapp.com",
  projectId: "finance-tracker-e4fd8",
  storageBucket: "finance-tracker-e4fd8.appspot.com",
  messagingSenderId: "10804775379",
  appId: "1:10804775379:web:197ae7235452017a864726",
  measurementId: "G-DLT9HSEYSN"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };