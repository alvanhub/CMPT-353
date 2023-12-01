import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const LandingPage = () => {
  return (
    <div style={{justifyContent: 'center', alignItems: 'center'}}>
      <h1>Welcome to the Landing Page</h1>
      <Link to="/all-posts">
        <button>Go to All Posts</button>
      </Link>
      <button onClick={handleLogout}>
          Logout
      </button>
    </div>
  );
};

export default LandingPage;
