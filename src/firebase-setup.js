import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCU8qYxyRnUQR6C7jqSw9lHA_tP0ZEAb3Y",
    authDomain: "read-voices-2.firebaseapp.com",
    projectId: "read-voices-2",
    storageBucket: "read-voices-2.appspot.com",
    messagingSenderId: "340433485596",
    appId: "1:340433485596:web:cb731b735ab3fe82a0c4d9",
    measurementId: "G-0J1H6G0VV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// init services

export const db = getFirestore();
export const auth = getAuth();

// collection ref

export const colRef = collection(db, "stories");

export const orderedCol = query(
    colRef,
    orderBy("meta.publishedAt", "desc")
);
