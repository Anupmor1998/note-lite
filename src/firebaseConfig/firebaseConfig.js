import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC-XXa-V_CbSY3kWHLcs2znyPGBS3x-Hs4",
  authDomain: "evernote-clone-1be06.firebaseapp.com",
  projectId: "evernote-clone-1be06",
  storageBucket: "evernote-clone-1be06.appspot.com",
  messagingSenderId: "459460505273",
  appId: "1:459460505273:web:7c2dedcf2c261567d13568",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp, auth, firebase };
