
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPj05wxiqMfhKeD4vv5ndykDVDfiuHkdo",
  authDomain: "react-netflix-clone-80272.firebaseapp.com",
  projectId: "react-netflix-clone-80272",
  storageBucket: "react-netflix-clone-80272.appspot.com",
  messagingSenderId: "743841846476",
  appId: "1:743841846476:web:b39ed3b8f4ede3b459de69",
  measurementId: "G-FEST5Y0TT2"
};


const app = initializeApp(firebaseConfig);

 const firebaseAuth = getAuth(app);

 export default firebaseAuth;
