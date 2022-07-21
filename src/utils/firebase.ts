import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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

firebase.initializeApp(firebaseConfig)

export default firebase