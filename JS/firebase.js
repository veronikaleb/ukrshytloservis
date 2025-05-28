// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCspFFtNGfS9wLghKLAu4ORMsJ1MH_YNCo",
  authDomain: "ukr-zhytlo-web.firebaseapp.com",
  projectId: "ukr-zhytlo-web",
  storageBucket: "ukr-zhytlo-web.firebasestorage.app",
  messagingSenderId: "351755151802",
  appId: "1:351755151802:web:1b317066b5f82111b49583",
  measurementId: "G-QX479THV6S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
