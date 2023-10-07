import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import emailjs from '@emailjs/browser';



function EmailVerification() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [otp, setOtp] = useState('000000');
    const [verificationId, setVerificationId] = useState('');
    const [sucess, setSucess] = useState('');
    const [verificationError, setVerificationError] = useState(null);
    const otpGenerator=async()=>{
        var digits = '0123456789'; 
        let otpcode = ''; 
        for (let i = 0; i < 6; i++ ) { 
            otpcode += digits[Math.floor(Math.random() * 10)]; 
        } 
        console.log("generated otp"+otpcode);
        return otpcode;
    }
    const mailSender = async (email, otp) => {
        try {
            if (email && otp) {
                emailjs.send('service_w46k1lc', 'template_skou5y3', {
                    otp, email
                }, 'pUJ7ft0r44dYAzVEc')
                    .then((result) => {
                        setVerificationId('123')
                        console.log(result.text);
                    }, (error) => {
                        console.log(error);
                    });
            } else {
                console.log('OTP : ' + otp);
                console.log('email : ' + email);

            }
        } catch (error) {
            console.log("err : ", error.message);
        }
    };
    const handleSendCode = async () => {
        try {
            const code=await otpGenerator()
            setOtp(code)
            console.log(code);
            
            await mailSender(email,code);
            console.log(otp);

        } catch (error) {
            console.error('Error sending verification code:', error);
            setVerificationError(error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            if (verificationCode === otp) {
                setSucess("Email verification Completed");
                console.log(sucess);
            } else {
                console.log(otp + ' : ' + verificationCode);
                setVerificationError("Invalid OTP");
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setVerificationError(error);
        }
    };


    return (
        <div>
            <h2>Email Verification</h2>
            {!verificationId && (
                <div>

                    <input type="email" name="" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <div id='sign-in-button'></div>
                    <button onClick={handleSendCode}>Send Verification Code</button>
                </div>
            )}
            {verificationId && (
                <>
                    <OTPInput
                        onChange={(value) => setVerificationCode(value)}
                        value={verificationCode}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <button onClick={handleVerifyCode}>Verify Code</button>
                </>
            )}
            {sucess && <p className="Sucess-p">{sucess}</p>}
            <div id="recaptcha-container"></div>
            {verificationError && <p className="error-message">{verificationError.message}</p>}
        </div>
    );
}

export default EmailVerification;