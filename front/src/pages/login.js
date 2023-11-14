import React, { useState, useContext } from 'react';
import {  useNavigate, Link} from 'react-router-dom';
import '../styles/doctor.css'
import RoleContext from './RoleContext';

const Login = () => {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    password: '',
  });

  const navigate  = useNavigate();

  const { setRole } = useContext(RoleContext);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the server for authentication

      const response = await fetch("http://localhost:4000/api/"+formData.role+"/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        withCredentials: true,
        credentials : `include`
      });

      const data = await response.json();
      if (response.ok) {
        // Reset error state on successful login
        setError('');
       // Set the role in the context
        setRole(formData.role);
        // Redirect or handle response as needed
        navigate("/"+formData.role+"/home");
      } else {
        // Display error message
        setError(data.error || 'An error occurred');
      }
      console.log(data);

      // Redirect or handle response as needed
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className='button-78' type="submit">Login</button>
        <br />
        <Link to="/resetPassword">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;
