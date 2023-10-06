import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from './firebase.js'

function EmailVerification() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [sucess, setSucess] = useState('');
    const [verificationError, setVerificationError] = useState(null);

    const onCaptchVerify = async () => {
        if (!window.recaptchaVerifier) {

            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log(response);
                }
            });
        }
    }
    const handleSendCode = async () => {
        try {
            onCaptchVerify()
            const appVerifier = window.recaptchaVerifier;
            let newPhone = '+' + phoneNumber
            signInWithPhoneNumber(auth, newPhone, appVerifier)
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
                    window.recaptchaVerifier.clear()
                    console.log(error);
                    setVerificationError(error);
                });
        } catch (error) {
            console.error('Error sending verification code:', error);
            setVerificationError(error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            window.confirmationResult.confirm(verificationCode).then(async (result) => {
                // User signed in successfully.

                const user = result.user;
                if (user) {
                    console.log(user);
                    setSucess('Sucess')
                }
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
            {!verificationId && (
                <div>
                    <PhoneInput
                        country={'in'}
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                    />
                    <div id='sign-in-button'></div>
                    <button onClick={handleSendCode}>Send Verification Code</button>
                </div>
            )}
            {verificationId && (
                <>
                    <OtpInput
                        onChange={(value) => setVerificationCode(value)}
                        value={verificationCode}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <button onClick={handleVerifyCode}>Verify Code</button>
                </>
            )}
            {sucess && <p className="Sucess-p">Mobile Number Verified</p>}
            <div id="recaptcha-container"></div>
            {verificationError && <p className="error-message">{verificationError.message}</p>}
        </div>
    );
}

export default EmailVerification;