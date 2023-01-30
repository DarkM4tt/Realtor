import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeddZkM1ef__gbdN16WVb8UrS65IfogSs",
  authDomain: "realtor-b80af.firebaseapp.com",
  projectId: "realtor-b80af",
  storageBucket: "realtor-b80af.appspot.com",
  messagingSenderId: "672381783145",
  appId: "1:672381783145:web:154bcd2db9750c50ce66f8",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
