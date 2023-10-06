import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';

// Initialize Firebase app
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
