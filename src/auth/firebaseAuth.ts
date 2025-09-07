import { firebaseConfig } from '../config/firebaseConfig';
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";


let _app:any = null;
export function ensureApp(){
  if(!_app){
    _app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig as any);
  }
  return _app;
}
export function auth(){
  ensureApp(); 
  return getAuth();
}
export async function signInEmailPassword(email:string, password:string){
  const a = auth();
  return await signInWithEmailAndPassword(a, email, password);
}
export async function signOutAll(){
  const a = auth();
  return await signOut(a);
}
