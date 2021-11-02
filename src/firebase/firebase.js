// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage'
import 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKxcxfMttnn7-8gA80rYn7gTbA9_9P2s8",
  authDomain: "baku-caviar-ba330.firebaseapp.com",
  databaseURL: "https://baku-caviar-ba330-default-rtdb.firebaseio.com",
  projectId: "baku-caviar-ba330",
  storageBucket: "gs://baku-caviar-ba330.appspot.com/",
  messagingSenderId: "630133167005",
  appId: "1:630133167005:web:886b019c7505781dabd574"
};

firebase.initializeApp(firebaseConfig);
const storage=firebase.storage()
const realDb=firebase.database()
const firestore=firebase.firestore()

const timestamp=firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};

export {storage,realDb,firestore}
// Initialize Firebase
