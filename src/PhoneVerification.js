// src/PhoneVerification.js
import React, { useState } from 'react';
import {  RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import auth from './firebase.js'

function PhoneVerification() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationError, setVerificationError] = useState(null);

    const handleSendCode = async () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log(response);
                }
            });
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    setVerificationId(window.confirmationResult.verificationId);
                    setVerificationError(null);
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...

                    console.log('handleSendCode');
                    console.log(error);
                    setVerificationError(error);
                });
        } catch (error) {
            console.error('Error sending verification code:', error);
            setVerificationError(error);
            console.log('handleSendCode2');
        }
    };

    const handleVerifyCode = async () => {
        try {
            window.confirmationResult.confirm(verificationCode).then((result) => {
                // User signed in successfully.
                var credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, verificationCode);
                signInWithCredential(credential);
                const user = result.user;
                console.log(user);
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log(error); 
                setVerificationError(error);
            });
        } catch (error) {
            console.error('Error verifying code:', error);
            setVerificationError(error);
        }
    };

    return (
        <div>
            <h2>Phone Number Verification</h2>
            <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p id='sign-in-button'></p>
            <button  onClick={handleSendCode}>Send Verification Code</button>
            {verificationId && (
                <>
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button onClick={handleVerifyCode}>Verify Code</button>
                </>
            )}
            <div id="recaptcha-container"></div>
            {verificationError && <p className="error-message">{verificationError.message}</p>}
        </div>
    );
}

export default PhoneVerification;
