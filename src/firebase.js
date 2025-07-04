// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Eğer çevresel değişkenlerle çalışıyorsan dotenv'den oku:
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCU0JuGFXYqGNtApcgtN8Zd1mGG07Zba80",
  authDomain: "aicoach-7bb37.firebaseapp.com",
  projectId: "aicoach-7bb37",
  storageBucket: "aicoach-7bb37.appspot.com",
  messagingSenderId: "7901375747",
  appId: "1:7901375747:web:b7d52fa9496e08f436cd36",
  measurementId: "G-7N5P1Y9HZ6",
};

// initializeApp sadece bir kez çalışsın (özellikle SSR projelerde önemli)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase Auth
export const auth = getAuth(app);

// Google Giriş
export const provider = new GoogleAuthProvider();

// Firestore DB
export const db = getFirestore(app);
