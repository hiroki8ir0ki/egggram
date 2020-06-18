import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCvtAAamGXDEvxYYOBypoE8xTESHX_irX8",
  authDomain: "egggram-12710.firebaseapp.com",
  databaseURL: "https://egggram-12710.firebaseio.com",
  projectId: "egggram-12710",
  storageBucket: "egggram-12710.appspot.com",
  messagingSenderId: "491282191001",
  appId: "1:491282191001:web:bfdc0f2e2044f6cfeade08",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
