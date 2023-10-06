
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUiYMepBrzq2v6vXn_IzIeAtIwU0Ed9dQ",
    authDomain: "otp-react-8bb9a.firebaseapp.com",
    projectId: "otp-react-8bb9a",
    storageBucket: "otp-react-8bb9a.appspot.com",
    messagingSenderId: "632365790768",
    appId: "1:632365790768:web:2b39f378c57bf401125ff5",
    measurementId: "G-X8SC9X519H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;

