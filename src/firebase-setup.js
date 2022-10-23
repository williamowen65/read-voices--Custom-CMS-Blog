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
import { getStorage } from "firebase/storage";

import {
    initializeAppCheck,
    ReCaptchaV3Provider,
} from "firebase/app-check";

import {
    getAnalytics,
    logEvent,
} from "firebase/analytics";

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
export const analytics = getAnalytics(app);
// init services
// console.log("hi");

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6Lf7cKYiAAAAADzZxykPfLD8q6ycbbgybW7BfJ95"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
});

// collection ref

export const colRef = collection(db, "stories");

export const orderedCol = query(
    colRef,
    orderBy("meta.publishedAt", "desc")
);
