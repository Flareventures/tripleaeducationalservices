// Copy this file to src/config/firebaseConfig.ts and fill your project keys.
// Option A: export firebaseConfig object (Web config from Firebase console).
// Option B: export already-initialized { app, db } (Firestore).

export const firebaseConfig = {
  apiKey: 'AIzaSyDN0lPIkSuPybu5tFEvnRqzryPCsP5JU0A',
  authDomain: 'tame-b2463.firebaseapp.com',
  projectId: 'tame-b2463',
  storageBucket: 'tame-b2463.firebasestorage.app',
  messagingSenderId: '906027510456',
  appId: '1:906027510456:web:0de936e84cea8ff039624d',
};

// Or, alternatively:
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
