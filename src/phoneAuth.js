import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';

// Initialize Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyBUiYMepBrzq2v6vXn_IzIeAtIwU0Ed9dQ",
    authDomain: "otp-react-8bb9a.firebaseapp.com",
    projectId: "otp-react-8bb9a",
    storageBucket: "otp-react-8bb9a.appspot.com",
    messagingSenderId: "632365790768",
    appId: "1:632365790768:web:2b39f378c57bf401125ff5",
    measurementId: "G-X8SC9X519H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneNumberAuth = () => {
    
    // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {});

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response);
        }
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    let verificationId; // Declare verificationId inside the function
    const handleSignIn = () => {
        const phoneNumberWithCountryCode = `+91${phoneNumber}`;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
            .then((confirmationResult) => {
                // SMS verification code sent
                verificationId = confirmationResult.verificationId;
                // ...
            })
            .catch((error) => {
                // Handle error
                console.error("Error sending verification code:", error);
            });
    };


    const handleVerifyCode = () => {
        const credential = PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );

        auth.signInWithCredential(credential)
            .then(() => {
                // User signed in successfully
                // You don't need the 'user' variable here, so it's removed.
                // ...
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <div>
            
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
            />
            <p id='sign-in-button'></p>
            <button id="sign-in-button" onClick={handleSignIn}>Send Verification Code</button>

            <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
            />
            <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
    );
};

export default PhoneNumberAuth;
