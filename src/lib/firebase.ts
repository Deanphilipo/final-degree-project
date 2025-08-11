import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// =================================================================================
// IMPORTANT!
//
// You need to replace this with the configuration from YOUR Firebase project.
//
// HOW TO GET YOUR CONFIG:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Select the project you want to use (the one where you see no data).
// 3. Click the Gear icon (⚙️) next to "Project Overview" in the top-left.
// 4. In the "Your apps" card, look for your web app. If you don't have one,
//    click the "</>" (Web) icon to create one.
// 5. In the "Firebase SDK snippet" section, select the "Config" option.
// 6. Copy the entire `firebaseConfig` object and paste it below, replacing
//    the existing placeholder object.
// =================================================================================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
