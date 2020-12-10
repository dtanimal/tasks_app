import firebase from "firebase";
    
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDlVGqnEKKM1LQ9k2Q75ipAq_pm9QV6Du4",
    authDomain: "tasks-app-8079b.firebaseapp.com",
    databaseURL: "https://tasks-app-8079b.firebaseio.com",
    projectId: "tasks-app-8079b",
    storageBucket: "tasks-app-8079b.appspot.com",
    messagingSenderId: "939185978273",
    appId: "1:939185978273:web:f4aae82c792e45804129e0",
    measurementId: "G-9RQ7PWW0DD"
});

//connects to firestore() stored in var db
const db = firebaseApp.firestore();

export default db;