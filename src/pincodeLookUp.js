import React, { useState } from 'react';

const PincodeLookup = () => {
    const [pincode, setPincode] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data.length > 0) {
                setResults(data[0].PostOffice);
            } else {
                setError('Invalid Pincode');
            }
        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="text" value={pincode} onChange={handlePincodeChange} className='mr-3' placeholder="Enter Pincode" />
            <button onClick={fetchData} className="btn btn-small btn-primary">Submit</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {results.length > 0 && (
                <div className='mt-5'>
                    <h4>Pincode Details</h4>
                    <div className="row">

                    {results.map((result, index) => (
                        <div key={index} className="col-md-2 m-4 card mb-3" style={{ width: '10rem' }}>
                            <div className="card-body">
                                <p className="card-title">Pincode: <b>{result.Pincode}</b></p>
                                <p className="card-text">State: <b>{result.State}</b></p>
                                <p className="card-text">District: <b>{result.District}</b></p>
                                <p className="card-text">City:  <b>{result.Name}</b></p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PincodeLookup;
