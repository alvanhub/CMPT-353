import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/login?name=${username}&password=${password}`,);

      if (response.status === 200) {
        // Login successful, perform actions like redirecting or setting tokens in localStorage
        localStorage.setItem("token", JSON.stringify(response.data.users[0]));
        //console.log(response.data.users[0]);
        window.location = "/";
        setUsername('');
        setPassword('');
      } else {
        console.log('Login failed.');
      }
    } catch (error) {
      alert('Incorrect Username or Password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <Link to="/signup">
        <button>Go to Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
