import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA8z7YOrpx6eEc_VueagyqenJDp0B3rjZc",
  authDomain: "fixmyconsole.firebaseapp.com",
  projectId: "fixmyconsole",
  storageBucket: "fixmyconsole.appspot.com",
  messagingSenderId: "287487142964",
  appId: "1:287487142964:web:f8e5059b6e753793866e61",
  measurementId: "G-XXXXXXXXXX"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
