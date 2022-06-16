// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUI_RMDUukdiAX8x8I-LCYQSvf1CYsfuI",
  authDomain: "ticket-sales-d51e7.firebaseapp.com",
  projectId: "ticket-sales-d51e7",
  storageBucket: "ticket-sales-d51e7.appspot.com",
  messagingSenderId: "1003591583532",
  appId: "1:1003591583532:web:85ba5120a5c16ae1d08e89",
  measurementId: "G-B954WK26PL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);