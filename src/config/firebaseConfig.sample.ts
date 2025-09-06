// Copy this file to src/config/firebaseConfig.ts and fill your project keys.
// Option A: export firebaseConfig object (Web config from Firebase console).
// Option B: export already-initialized { app, db } (Firestore).

export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MSG_SENDER',
  appId: 'YOUR_APP_ID',
};

// Or, alternatively:
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
