// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf5dbIMm7yk5jmMeiHGJC9-34lhHcp5b8",
  authDomain: "netflix-c-dbe9e.firebaseapp.com",
  projectId: "netflix-c-dbe9e",
  storageBucket: "netflix-c-dbe9e.firebasestorage.app",
  messagingSenderId: "1046214569309",
  appId: "1:1046214569309:web:52ba63c080e0417a178cb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export const signup = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export const logout = ()=>{
    signOut(auth);
}

export {auth, db}
