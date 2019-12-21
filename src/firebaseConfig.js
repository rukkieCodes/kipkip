import firebase from 'firebase';
import 'firebase/storage';
require("firebase/firestore");


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYQjf1BKsH-In3EWdxccgtJz7eaIlho2E",
    authDomain: "keeptuk.firebaseapp.com",
    databaseURL: "https://keeptuk.firebaseio.com",
    projectId: "keeptuk",
    storageBucket: "keeptuk.appspot.com",
    messagingSenderId: "329682984792",
    appId: "1:329682984792:web:0014811d7f194bd16a0f2d",
    measurementId: "G-5SVSY35HKF"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }