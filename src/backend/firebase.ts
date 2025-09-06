// Firebase backend wrapper
// Provide config in src/config/firebaseConfig.ts — see firebaseConfig.sample.ts
import type { Artifact } from './index';
let _firestore: any = null;
let _mod: any = null;

async function ensure(){
  if(_firestore) return;
  try{
    const cfg = await import('../config/firebaseConfig'); // must export { app, db } or Firebase config
    const app = cfg.app || null;
    const db = cfg.db || null;
    if(db){ _firestore = db; }
    else{
      const firebase = await import('firebase/app');
      const firestore = await import('firebase/firestore');
      const appInit = firebase.initializeApp(cfg.firebaseConfig);
      _firestore = firestore.getFirestore(appInit);
      _mod = firestore;
    }
    if(!_mod){
      _mod = await import('firebase/firestore');
    }
  }catch(e){
    throw new Error('Firebase not configured: create src/config/firebaseConfig.ts with Firebase Web SDK config.');
  }
}

export async function fbSaveArtifact(a:Artifact){
  await ensure();
  const { addDoc, collection } = _mod;
  const ref = collection(_firestore, 'artifacts');
  await addDoc(ref, a as any);
}

export async function fbGetArtifactsByStudent(studentId:string, limitN:number=50){
  await ensure();
  const { getDocs, query, where, orderBy, limit, collection } = _mod;
  const ref = collection(_firestore, 'artifacts');
  const q = query(ref, where('studentId','==',studentId), orderBy('ts','desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map((d:any)=> d.data());
}
