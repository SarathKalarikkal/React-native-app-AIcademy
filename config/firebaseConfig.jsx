import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBNd1bW3aPjteXjPkg73iIcaYpdPi6gG5g",
  authDomain: "projects-2025-2eda6.firebaseapp.com",
  projectId: "projects-2025-2eda6",
  storageBucket: "projects-2025-2eda6.appspot.com", // Corrected storage URL
  messagingSenderId: "192658865644",
  appId: "1:192658865644:web:e7a7a960f509d7a3e714c9",
  measurementId: "G-S3TDTD6TEL"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Choose persistence method based on environment
let auth;
if (typeof window !== "undefined") {
  // Running in the browser
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  // Running in React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, app, db, storage };
