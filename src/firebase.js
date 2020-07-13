import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC37_jxKxvyy6p4pNAQ4jlkiVBk09Q5YNY",
    authDomain: "gymdatabase-d1d01.firebaseapp.com",
    databaseURL: "https://gymdatabase-d1d01.firebaseio.com",
    projectId: "gymdatabase-d1d01",
    storageBucket: "gymdatabase-d1d01.appspot.com",
    messagingSenderId: "400241082864",
    appId: "1:400241082864:web:a5a2cf59dbc90dae0bdd35"
});

const db = firebaseApp.firestore();

export { db };