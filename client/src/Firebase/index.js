import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import "firebase/messaging";
import "firebase/analytics";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAAau1u0Kj73GQO7RuUs_m9ciSR3o38qa8",
    authDomain: "shared-dbac4.firebaseapp.com",
    databaseURL: "https://shared-dbac4-default-rtdb.firebaseio.com",
    projectId: "shared-dbac4",
    storageBucket: "shared-dbac4.appspot.com",
    messagingSenderId: "28242124973",
    appId: "1:28242124973:web:b29d5d451159e243652624",
    measurementId: "G-425R3Z3H22"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();

// Authentication for Google
var googleProvider = new firebase.auth.GoogleAuthProvider();
// Authentication for Facebook
var facebookProvider = new firebase.auth.FacebookAuthProvider();
// Authentication for Twitter
var twitterProvider = new firebase.auth.TwitterAuthProvider();

export {
    firestore, auth, googleProvider, facebookProvider, twitterProvider, database, storage, firebase as default
}