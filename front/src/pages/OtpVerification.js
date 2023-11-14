import React, { useState } from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import '../styles/doctor.css'

const OtpVerification = () => {
    const navigate = useNavigate();
    const { role } = useParams(); // Get the role from the URL params
    const [formData, setFormData] = useState({
        OTP: '',
        username: '',
        newPassword: '',
        reNewPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make a request to the server for authentication
    
            const response = await fetch("http://localhost:4000/api/"+role+"/verifyOTP/:"+role, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                OTP: formData.OTP,
                username: formData.username,
                newPassword: formData.newPassword,
                reNewPassword: formData.reNewPassword,
            }),
            withCredentials: true,
            credentials : `include`
            });

            if (!response.ok) {
                // If response status is not ok, handle it differently
                const errorText = await response.text();
                setError(`Error: ${response.status} - ${errorText}`);
                return;
              }
    
            const data = await response.json();
            if (response.ok) {
            // Reset error state and move back to the login step
                setError('');
                // Navigate to the login page after successful password reset
                navigate('/login');
            } else {
                setError(data.error || 'An error occurred during password verification');
            }
          // Redirect or handle response as needed
        } catch (error) {
            console.error('Error during password verification:', error);
        }
    };
    return (
        <div>
          <h2>Reset Password</h2>
          <p>Step 2 of 2</p>
          <form onSubmit={handleSubmit}>
            <label>
              Enter OTP:
              <input
                type="text"
                name="OTP"
                value={formData.OTP}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Enter Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Enter New Password:
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Re-Enter New Password:
              <input
                type="password"
                name="reNewPassword"
                value={formData.reNewPassword}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button className='button-78' type="submit">Reset Password</button>
          </form>
        </div>
    );
};

export default OtpVerification;
