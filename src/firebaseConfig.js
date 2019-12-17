import firebase from 'firebase';
import 'firebase/storage';
require("firebase/firestore");


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCp6jQbqn9fa7OIw7bwaCzPCpfgUfhp8PE",
    authDomain: "kipkip-rc.firebaseapp.com",
    databaseURL: "https://kipkip-rc.firebaseio.com",
    projectId: "kipkip-rc",
    storageBucket: "kipkip-rc.appspot.com",
    messagingSenderId: "689764214787",
    appId: "1:689764214787:web:14bf186de89e254e650636",
    measurementId: "G-LCNR5LJV81"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }