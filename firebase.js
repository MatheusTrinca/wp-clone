import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4OPlZW_purnp8krwRdYaRTCg3Z1HOUdw',
  authDomain: 'wp-clone-21978.firebaseapp.com',
  projectId: 'wp-clone-21978',
  storageBucket: 'wp-clone-21978.appspot.com',
  messagingSenderId: '965536371540',
  appId: '1:965536371540:web:50615305db2176cce66ec1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
