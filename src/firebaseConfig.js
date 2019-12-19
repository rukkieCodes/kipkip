import firebase from 'firebase';
import 'firebase/storage';
require("firebase/firestore");


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJrDsNrfgC1k23L2IJrJ3Ck_AkrKqhSaY",
    authDomain: "rukieo.firebaseapp.com",
    databaseURL: "https://rukieo.firebaseio.com",
    projectId: "rukieo",
    storageBucket: "rukieo.appspot.com",
    messagingSenderId: "316401338361",
    appId: "1:316401338361:web:1aaafff45a5eb7df495f28",
    measurementId: "G-9369JH55BW"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }