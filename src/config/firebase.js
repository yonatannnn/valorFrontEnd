import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDy9QG45FkaGxcp_3k9GqdxjKafajiGKyA",
  authDomain: "digital-menu-47c30.firebaseapp.com",
  projectId: "digital-menu-47c30",
  storageBucket: "digital-menu-47c30.appspot.com",
  messagingSenderId: "350396316425",
  appId: "1:350396316425:web:d9ba842b742e4537d431d8",
  measurementId: "G-MTFRTKGPVP"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);