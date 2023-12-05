import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import your Landing component
import AllPosts from './components/AllPosts'; // Import your AllPosts component
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';

function App() {
  const user = localStorage.getItem("token");


  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {user && <Route path="/" element={<LandingPage />} />}
      {user && <Route path="/all-posts" element={<AllPosts/>} />}
      {user && <Route path="/search" element={<Search/>} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
      {/* Other routes can be defined here */}
    </Routes>
  );
}

export default App;
