import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "soft-girl-corner.firebaseapp.com",
  projectId: "soft-girl-corner",
  storageBucket: "soft-girl-corner.firebasestorage.app",
  messagingSenderId: "966084178002",
  appId: "1:966084178002:web:2423e10f1161d2e2f16f8b",
  measurementId: "G-8HWYVFR5BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
