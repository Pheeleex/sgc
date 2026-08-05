import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "soft-girl-corner.firebaseapp.com",
  projectId: "soft-girl-corner",
  messagingSenderId: "966084178002",
  appId: "1:966084178002:web:2423e10f1161d2e2f16f8b",
  measurementId: "G-8HWYVFR5BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
