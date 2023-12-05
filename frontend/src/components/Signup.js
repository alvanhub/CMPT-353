import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSignup = async (e) => {
            e.preventDefault();

            try {
            const response = await axios.post(`http://localhost:5000/addUser?name=${username}&password=${password}`,);

            if (response.status === 200) {
                // Login successful, perform actions like redirecting or setting tokens in localStorage
                console.log('Signup successful!');
                window.location = "/login";
                setUsername('');
                setPassword('');
            } else {
                console.log('Sign Up failed.');
            }
            } catch (error) {
            alert('Incorrect Username or Password');
            }
        };
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Signup</button>
        <Link to="/login">
        <button>Go to Login</button>
        </Link>
      </form>
    </div>
  )
}

export default Signup
