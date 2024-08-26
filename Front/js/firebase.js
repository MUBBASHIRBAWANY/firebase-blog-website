import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {where,getDocs, getFirestore, query, collection,doc,getDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO8iJPNn_T83Y4iVkkmz-RtAuQ8f-k33E",
  authDomain: "newproject-d9c8d.firebaseapp.com",
  projectId: "newproject-d9c8d",
  storageBucket: "newproject-d9c8d.appspot.com",
  messagingSenderId: "391566306472",
  appId: "1:391566306472:web:b7184de3c72b873d40269d",
  measurementId: "G-KZ71SWN3W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db ,where, getDocs,query, collection, doc ,getDoc}



