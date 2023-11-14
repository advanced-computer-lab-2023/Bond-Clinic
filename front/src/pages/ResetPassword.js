import React, { useState, useContext } from 'react';
import {  useNavigate, Link} from 'react-router-dom';
import '../styles/doctor.css'
import RoleContext from './RoleContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { setRole } = useContext(RoleContext);
    const [formData, setFormData] = useState({
        role: '',
        username: '',
        email: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make a request to the server for authentication
    
            const response = await fetch("http://localhost:4000/api/"+formData.role+"/resetPassword", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                role: formData.role,
                username: formData.username,
                email: formData.email,
            }),
            withCredentials: true,
            credentials : `include`
            });
    
            const data = await response.json();
            if (response.ok) {
            // Move to the next reset step
                setError('');
            // Set the role in the context
                setRole(formData.role);
            // Navigate to OtpVerification page with formData.role
                navigate("/verifyOTP");
            } else {
                setError(data.error || 'An error occurred during password reset');
            }
          // Redirect or handle response as needed
        } catch (error) {
          console.error('Error Reseting Password:', error);
        }
    };
    return (
        <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>  
            <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
                </select>
            </label>
            <br />
            <label>
                Username:
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
                Enter your email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <button className='button-78' type="submit">
                Send OTP
            </button>
        </form>
        <br />
        <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ResetPassword;
