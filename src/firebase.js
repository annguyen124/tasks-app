import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQOxPBKdtcIfBqLQP-BQAbsIoiUsSeWaA",
  authDomain: "todos-react-672c1.firebaseapp.com",
  projectId: "todos-react-672c1",
  storageBucket: "todos-react-672c1.appspot.com",
  messagingSenderId: "39840597749",
  appId: "1:39840597749:web:73392e8a968592bdf5a7bc",
  measurementId: "G-LPZWXG9WRY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
