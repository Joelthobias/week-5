import React, { useState, useEffect } from 'react';

const PincodeLookup = () => {
    const [pincode, setPincode] = useState('');
    const [result, setResult] = useState(null);

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (pincode.length === 6) {
            fetchData();
        }
    }, [pincode]);

    return (
        <div>
            <input type="text" value={pincode} onChange={handlePincodeChange} placeholder="Enter Pincode" />
            {result && (
                <div>
                    <h2>Pincode Details</h2>
                    <p>Pincode: {result[0].PostOffice[0].Pincode}</p>
                    <p>State: {result[0].PostOffice[0].State}</p>
                    <p>District: {result[0].PostOffice[0].District}</p>
                    <p>City: {result[0].PostOffice[0].City}</p>
                </div>
            )}
        </div>
    );
};

export default PincodeLookup;
