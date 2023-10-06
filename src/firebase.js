import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDZ7b_XfKetC3C53dx0QASIXEYvsNqVzG8",
    authDomain: "week52023.firebaseapp.com",
    projectId: "week52023",
    storageBucket: "week52023.appspot.com",
    messagingSenderId: "722903350049",
    appId: "1:722903350049:web:77d8a8a0dbda8f394c9c60"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;

