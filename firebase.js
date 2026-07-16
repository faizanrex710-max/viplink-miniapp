import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeMF2kzpjYITuoF1eexw_vMXWKQNyauW0",
  authDomain: "daily-viral-videos-78364.firebaseapp.com",
  projectId: "daily-viral-videos-78364",
  storageBucket: "daily-viral-videos-78364.firebasestorage.app",
  messagingSenderId: "620876469390",
  appId: "1:620876469390:web:3bc3ab8b28372bef5b25df",
  measurementId: "G-RPESBMW0ME"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
