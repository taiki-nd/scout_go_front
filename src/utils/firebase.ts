import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseConstant } from "../config/constant";

const firebaseConfig = {
  apiKey: FirebaseConstant.apikey,
  authDomain: FirebaseConstant.authDomain,
  projectId: FirebaseConstant.projectId,
  storageBucket: FirebaseConstant.storageBucket,
  messagingSenderId: FirebaseConstant.messagingSenderId,
  appId: FirebaseConstant.appId,
  measurementId: FirebaseConstant.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
