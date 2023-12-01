import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css'; // Import your CSS file for styling

import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
import CreateChannel from './CreateChannel';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [channels, setChannels] = useState([]);
  const [postId, setPostId] = useState('');
  const [channelId, setChannelId] = useState([]);

  // fetch channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getChannels`);
        if (response.status === 200) {
          setChannels(response.data.channels);
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();

  });

  // fetch posts
  const fetchPosts = async (channelId) => {
    setChannelId(channelId);
    try {
      const response = await axios.get(`http://localhost:5000/getChannelPosts?channel_id=${channelId}`);
      if (response.status === 200) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  

  const fetchComments = async (postId) => {
    setPostId(postId);

    try {
      const response = await fetch(`http://localhost:5000/getComments?postId=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        //console.log(data.comments)
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  


  // Display posts in the UI
  return (
    <div> 
        <Link to="/">
            <button className="back-btn">Go Back to Landing Page</button>
        </Link>
        <div style={{paddingTop: "50px",display: 'flex', justifyContent: 'space-between'}}>
          <div>
              <h2>Channels</h2>
              <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
                <div className='comments-container'>
                  {channels.map((channel) => (
                  <div className="post-box" key={channel.id}>
                    <p>Channel ID: {channel.id}</p>
                    <p>Topic: {channel.topic}</p>
                    <button onClick={() => fetchPosts(channel.id)}>See Posts</button>
                  </div>
                ))}
                </div>
              </div>
              <CreateChannel />
          </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <h2>Channel Posts</h2>
                <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
                  <div className="post-container"> {/* Apply CSS class for styling */}
                    <div>
                      {posts.map((post) => (
                        // <div style={{display: 'flex', margin: '10px', justifyContent: 'space-between'}}>
                          
                          <div className="post-box" key={post.id}> {/* Apply CSS class for post box */}
                          {/* Render post data here */}
                          <p>Post ID: {post.id}</p>
                          <p>Topic: {post.topic}</p>
                          <p>Data: {post.data}</p>
                          {post.image && (
                            <img src={`http://localhost:5000/uploads/${post.image}`} alt="post Image" style={{ width: '200px', height: '150px' }}/>
                          )}
                          <button onClick={() => fetchComments(post.id)}>See Replies</button>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
                {channelId && <CreatePost channelId={channelId}/>}
              </div>
            </div>
          <div>
            <h2>Post Replies</h2>
            <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
              <div className='comments-container'>
                {comments.map((comment) => (
                <div className="post-box" key={comment.id}>
                  <p>Comment ID: {comment.id}</p>
                  <p>Content: {comment.text}</p>
                  
                  {comment.image && (
                    <img src={`http://localhost:5000/uploads/${comment.image}`} alt="Comment Image" style={{ width: '200px', height: '150px' }}/>
                  )}
                </div>
              ))}
              </div>
            </div>
            {postId && <CreateComment postId={postId} />}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
