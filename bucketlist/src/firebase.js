// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsRxaA31EkFu7VX18XV3okV4tRgyeb3AE",
  authDomain: "bucketlist-aami.firebaseapp.com",
  projectId: "bucketlist-aami",
  storageBucket: "bucketlist-aami.firebasestorage.app",
  messagingSenderId: "532378198635",
  appId: "1:532378198635:web:8ee1b48055dd45dcce472e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };