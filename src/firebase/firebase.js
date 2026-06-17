import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBz9bvKIgkUP62nZaszM43_q7FQmvB-iwo",
  authDomain: "worklinker-65af1.firebaseapp.com",
  projectId: "worklinker-65af1",
  storageBucket: "worklinker-65af1.firebasestorage.app",
  messagingSenderId: "938029191002",
  appId: "1:938029191002:web:650b14436f3281ff352d63",
  measurementId: "G-E1GGB3SNRD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
