import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

const LandingPage = () => {
  const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class

  const user = JSON.parse(localStorage.getItem("token"));

  const handleClassChange = async (event) => {
    const newSelectedClass = event.target.value; // Get the newly selected class
    setSelectedClass(newSelectedClass);
    try {
      const response = await axios.put(`http://localhost:5000/updateClass?userId=${user.id}&newClass=${newSelectedClass}`);
      if (response.status === 200) {
        console.log("success");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }

    try {
      const response = await axios.put(`http://localhost:5000/updatePostsClass?userName=${user.name}&newClass=${newSelectedClass}`);
      if (response.status === 200) {
        console.log("success");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }

    try {
      const response = await axios.put(`http://localhost:5000/updateCommentsClass?userName=${user.name}&newClass=${newSelectedClass}`);
      if (response.status === 200) {
        console.log("success");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1>Welcome to the Landing Page</h1>
      {/* Dropdown menu */}
      <select value={selectedClass} onChange={handleClassChange}>
        <option value="">Select a class</option>
        <option value="beginner">Beginner</option>
        <option value="amateur">Amateur</option>
        <option value="pro">Pro</option>
        <option value="veteran">Veteran</option>
      </select>
      {/* Display selected class */}
      {selectedClass && <p>You selected: {selectedClass}</p>}
      <Link to="/all-posts">
        <button>Go to All Posts</button>
      </Link>
      <Link to="/search">
        <button>Go to Content Search</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LandingPage;
