import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwMZUu6tYnxk1_6cwgx1LxSs_jzkTgmiE",
    authDomain: "typing-website-fea62.firebaseapp.com",
    projectId: "typing-website-fea62",
    storageBucket: "typing-website-fea62.appspot.com",
    messagingSenderId: "473268209691",
    appId: "1:473268209691:web:14b400d8cc830eb4ef10be",
    measurementId: "G-2JLE6KDQEL"
  };

  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db};