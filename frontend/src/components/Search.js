import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('users'); // Default topic: users
  const [channelTopic, setChannelTopic] = useState('userHighest')
  const [userChannelCount, setUserChannelCount] = useState([]);


  const handleSearch = () => {
    // Logic to perform search based on searchTerm and selectedTopic
    // You can use API calls or filter local data based on the selected topic and search term
    // Set search results based on the selectedTopic
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getChannels`);
        if (response.status === 200) {
          setUserChannelCount(response.data.channels);
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    //console.log(parent);

    fetchChannels();


  });

  const userChannelsCount = userChannelCount.reduce((acc, channel) => {
    if (!acc[channel.userName]) {
      acc[channel.userName] = 1;
    } else {
      acc[channel.userName] += 1;
    }
    return acc;
  }, {});

  // Finding the user with the most channels
  const mostChannelsUser =
    Object.keys(userChannelsCount).length > 0
      ? Object.keys(userChannelsCount).reduce((a, b) =>
          userChannelsCount[a] > userChannelsCount[b] ? a : b
        )
      : '';

  const handleChannelChange = (topic) => {
    setChannelTopic(topic);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div>
      <Link to="/">
          <button className="back-btn">Go Back to Landing Page</button>
      </Link>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Selected Topic: {selectedTopic}</h2>
        <div>
          {/* Topic selection buttons */}
          <button onClick={() => handleTopicChange('users')}>Users</button>
          <button onClick={() => handleTopicChange('channels')}>Channels</button>
          <button onClick={() => handleTopicChange('posts')}>Posts</button>
          <button onClick={() => handleTopicChange('comments')}>Comments/Replies</button>
        </div>

        {/* Render search results based on the selected topic */}
        {selectedTopic === 'users' && (
          <div>
            yes
            {/* Display search results for users */}
            {/* Example: <UserSearchResults searchTerm={searchTerm} /> */}
          </div>
        )}

        {selectedTopic === 'channels' && (
          <div>
            <h2>What would you like to Search?</h2>
            <div>
              <button onClick={() => handleChannelChange('userHighest')}>Users and Their Channel Counts</button>
              {selectedTopic === 'channels' && (
                <div>
                  <h2>Users and Their Channels Count:</h2>
                  <ul>
                    {Object.keys(userChannelsCount).map((user) => (
                      <li key={user}>
                        {user}: {userChannelsCount[user]} channels
                      </li>
                    ))}
                  </ul>
                  <div>
                  <h2>User with Most Channels:</h2>
                  <p>{mostChannelsUser} has created the most channels.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTopic === 'posts' && (
          <div>
            {/* Display search results for posts */}
            {/* Example: <PostSearchResults searchTerm={searchTerm} /> */}
          </div>
        )}

        {selectedTopic === 'comments' && (
          <div>
            {/* Display search results for comments/replies */}
            {/* Example: <CommentSearchResults searchTerm={searchTerm} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
