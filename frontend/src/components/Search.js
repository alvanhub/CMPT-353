import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [postsResult, setpostsResult] = useState([]);
  const [channelResult, setChannelResult] = useState([]);
  const [commentResult, setCommentResult] = useState([]);
  const [userResult, setUserResult] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('posts'); // Default topic: users
  const [channelTopic, setChannelTopic] = useState('userHighest')
  const [userChannelCount, setUserChannelCount] = useState([]);
  const [postTopic, setPostTopic] = useState('userHighest')
  const [userPostCount, setUserPostCount] = useState([]);
  const [messageTopic, setMessageTopic] = useState('userHighest')
  const [userMessageCount, setUserMessageCount] = useState([]);
  const [users, setUsers] =  useState([]);
  const [selectedUser, setSelectedUser] =  useState(null);



  useEffect(() => {  
    const handleSearch = () => {
      if (searchTerm === ''){
        setSearchTerm('');
        if (selectedTopic ==='posts') {
          setpostsResult(userPostCount);
        }else if (selectedTopic ==='channels'){
          setChannelResult(userChannelCount);
        }
        else if (selectedTopic ==='comments'){
          setCommentResult(userMessageCount);
        }
        else if (selectedTopic ==='users'){
          setUserResult(users);
        }
        return;
      }
      if (postTopic === 'searchPosts') {
        // Filter posts based on the search term
        const filteredPosts = userPostCount.filter((post) => {
          // Search in userName or topic for the searchTerm
          return (
            post.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.topic.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        // Update the state with the filtered posts
        setpostsResult(filteredPosts);
      }
      if (channelTopic === 'searchChannels') {
        // Filter posts based on the search term
        const filteredChannels = userChannelCount.filter((channel) => {
          // Search in userName or topic for the searchTerm
          return (
            channel.topic.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        // Update the state with the filtered posts
        setChannelResult(filteredChannels);
      }
      if (messageTopic === 'searchComments') {
        // Filter posts based on the search term
        const filteredComments = userMessageCount.filter((comment) => {
          // Search in userName or topic for the searchTerm
          return (
            comment.text.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        // Update the state with the filtered posts
        setCommentResult(filteredComments);
      }
      if (selectedTopic === 'users') {
        // Filter posts based on the search term
        const filteredUsers = users.filter((user) => {
          // Search in userName or topic for the searchTerm
          return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        // Update the state with the filtered posts
        setUserResult(filteredUsers);
      }

      
    };

    handleSearch();
  }, [searchTerm])

  /////////////////// Channels ////////////////////////
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getChannels`);
        if (response.status === 200) {
          setUserChannelCount(response.data.channels);
          // if (selectedTopic == 'channels'){
          //   setChannelResult(response.data.channels);
          // }
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    if (searchTerm === ''){
      fetchChannels();
    }

    //console.log(parent);

    fetchChannels();


  },[setUserChannelCount, channelTopic, searchTerm]);

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


  /////////////////// Posts ////////////////////////
  useEffect(() => {
    const fetchPosts = async () => {
      
      try {
        const response = await axios.get(`http://localhost:5000/getPosts`);
        if (response.status === 200) {
          setUserPostCount(response.data.posts);

          if (selectedTopic == 'posts'){
            setpostsResult(response.data.posts);
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    //console.log(parent);

    fetchPosts();


  },[setUserPostCount, postTopic]);

  const userPostsCount = userPostCount.reduce((acc, post) => {
    if (!acc[post.userName]) {
      acc[post.userName] = 1;
    } else {
      acc[post.userName] += 1;
    }
    return acc;
  }, {});

  // Finding the user with the most channels
  const mostPostsUser =
    Object.keys(userPostsCount).length > 0
      ? Object.keys(userPostsCount).reduce((a, b) =>
          userPostsCount[a] > userPostsCount[b] ? a : b
        )
      : '';

  const handlePostChange = (topic) => {
    setPostTopic(topic);
  };


  /////////////////// Messages ////////////////////////
  useEffect(() => {
    const fetchMessages = async () => {
      
      try {
        const response = await axios.get(`http://localhost:5000/getComments`);
        if (response.status === 200) {
          setUserMessageCount(response.data.comments);
          // if (selectedTopic == 'comments'){
          //   setpostsResult(response.data.comments);
          // }
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    //console.log(parent);

    fetchMessages();


  },[setUserMessageCount, messageTopic]);

  const userMessagesCount = userMessageCount.reduce((acc, message) => {
    if (!acc[message.userName]) {
      acc[message.userName] = 1;
    } else {
      acc[message.userName] += 1;
    }
    return acc;
  }, {});

  // Finding the user with the most channels
  const mostMessagesUser =
    Object.keys(userMessagesCount).length > 0
      ? Object.keys(userMessagesCount).reduce((a, b) =>
          userMessagesCount[a] > userMessagesCount[b] ? a : b
        )
      : '';

  const handleMessageChange = (topic) => {
    setMessageTopic(topic);
  };

  /////////////////// Messages ////////////////////////
  useEffect(() => {
    const handleUsers = async () => {

      try {
        const response = await axios.get(`http://localhost:5000/getUsers`);

        if (response.status === 200) {
          // Login successful, perform actions like redirecting or setting tokens in localStorage
        
          setUsers(response.data.users);
          if(selectedTopic != "users"){
            setUserResult(response.data.users);
          }
        } else {
          console.log('Login failed.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleUsers();
  },[users, searchTerm]);

  const handleTopicChange = (topic) => {
    //console.log(selectedUser)
    setSelectedUser(null);
    setSelectedTopic(topic);
  };

  return (
    <div>
      <Link to="/">
          <button className="back-btn">Go Back to Landing Page</button>
      </Link>

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
            <h1>Search</h1>
            <input
              type="text"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h2>Users</h2>
            <p>select a user to see their posted content</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                {userResult.map((user) => (   
                <div className="post-box" key={user.id} onClick={() => setSelectedUser(user)}>
                {/* Render user data here */}
                <p>{user.name}</p>
                </div>
              ))}
              </div>
              {selectedUser && 
              <div>
                yess
              </div>
              }
            </div>
            {/* Display search results for users */}
            {/* Example: <UserpostsResults searchTerm={searchTerm} /> */}
          </div>
        )}

        {selectedTopic === 'channels' && (
          <div>
            <h2>What would you like to Search?</h2>
            <div>
              <button onClick={() => handleChannelChange('userHighest')}>Users and Their Channel Counts</button>
              <button onClick={() => handleChannelChange('searchChannels')}>Search All Channels</button>
              {channelTopic === 'userHighest' && (
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
              {channelTopic === 'searchChannels' && (
                <div>
                <h1>Search</h1>
                <input
                  type="text"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
                {channelResult.map((channel) => (   
                  <div className="post-box" key={channel.id}> {/* Apply CSS class for post box */}
                  {/* Render post data here */}
                  <p>Sender: {channel.userName}</p>
                  <p>channel ID: {channel.id}</p>
                  <p>Topic: {channel.topic}</p>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        )}

        {selectedTopic === 'posts' && (
          <div>
            <h2>What would you like to Search?</h2>
            <div>
              <button onClick={() => handlePostChange('userHighest')}>Users and Their Post Counts</button>
              <button onClick={() => handlePostChange('searchPosts')}>Search All Posts</button>
              {postTopic === 'userHighest' && (
                <div>
                  <h2>Users and Their Posts Count:</h2>
                  <ul>
                    {Object.keys(userPostsCount).map((user) => (
                      <li key={user}>
                        {user}: {userPostsCount[user]} posts
                      </li>
                    ))}
                  </ul>
                  <div>
                  <h2>User with Most Posts:</h2>
                  <p>{mostPostsUser} has created the most posts.</p>
                  </div>
                </div>
              )}
              {postTopic === 'searchPosts' && (
                <div>
                <h1>Search</h1>
                <input
                  type="text"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
                {postsResult.map((post) => (   
                  <div className="post-box" key={post.id}> {/* Apply CSS class for post box */}
                  {/* Render post data here */}
                  <p>Sender: {post.userName}</p>
                  <p>Post ID: {post.id}</p>
                  <p>Topic: {post.topic}</p>
                  <p>Data: {post.data}</p>
                  {post.image && (
                    <img src={`http://localhost:5000/uploads/${post.image}`} alt="post Image" style={{ width: '200px', height: '150px' }}/>
                  )}
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        )}

        {selectedTopic === 'comments' && (
          <div>
            <h2>What would you like to Search?</h2>
            <div>
              <button onClick={() => handleMessageChange('userHighest')}>Users and Their Message Counts</button>
              <button onClick={() => handleMessageChange('searchComments')}>Search All Comments</button>
              {messageTopic === 'userHighest' && (
                <div>
                  <h2>Users and Their Messages Count:</h2>
                  <ul>
                    {Object.keys(userMessagesCount).map((user) => (
                      <li key={user}>
                        {user}: {userMessagesCount[user]} posts
                      </li>
                    ))}
                  </ul>
                  <div>
                  <h2>User with Most Messages:</h2>
                  <p>{mostMessagesUser} has created the most messages.</p>
                  </div>
                </div>
              )}
              {messageTopic === 'searchComments' && (
                <div>
                <h1>Search</h1>
                <input
                  type="text"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
                {commentResult.map((comment) => (   
                  <div className="post-box" key={comment.id}> {/* Apply CSS class for comment box */}
                  {/* Render comment data here */}
                  <p>Sender: {comment.userName}</p>
                  <p>comment ID: {comment.id}</p>
                  <p>Content: {comment.text}</p>
                  {comment.image && (
                    <img src={`http://localhost:5000/uploads/${comment.image}`} alt="post Image" style={{ width: '200px', height: '150px' }}/>
                  )}
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
