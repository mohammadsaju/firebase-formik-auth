import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCZt_oGWnBgBv0YlQ1_P8inLFUguco42Gc",
    authDomain: "fir-auth-f7a14.firebaseapp.com",
    projectId: "fir-auth-f7a14",
    storageBucket: "fir-auth-f7a14.appspot.com",
    messagingSenderId: "60476507330",
    appId: "1:60476507330:web:7e6bcc6c2e2c59a117275b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export {auth, googleProvider, githubProvider};