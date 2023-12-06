import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css'; // Import your CSS file for styling

import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
import CreateChannel from './CreateChannel';
import Comment from './Comment';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [channels, setChannels] = useState([]);
  const [postId, setPostId] = useState('');
  const [mapUser, setMapUser] = useState('');
  const [channelId, setChannelId] = useState([]);
  const [parent, setParent] = useState({});

  const user = JSON.parse(localStorage.getItem("token"));

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

    //console.log(parent);

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
      const response = await fetch(`http://localhost:5000/getChildComments?postId=${postId}`, {
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

  const handleFetchChildren = async (setChild, parentId, id) => {

    try {
      //console.log(parentId);
      const response = await axios.get(`http://localhost:5000/getRecursiveComments?parentId=${parentId}&id=${id}`);
      if (response.status === 200) {
        const data = await response.data;
        //console.log(data.comments[0].children);
        if (data.comments[0]){
          setChild(JSON.parse(data.comments[0].children));
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDeleteComment = async (id) =>  {
    try {
      const response = await axios.put(`http://localhost:5000/removeComment?id=${id}`);
      if (response.status === 200) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const handleDeletePost = async (id) =>  {
    try {
      const response = await axios.put(`http://localhost:5000/removePost?id=${id}`);
      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const handleDeleteChannel = async (id) =>  {
    try {
      await axios.put(`http://localhost:5000/removeChannel?id=${id}`);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const handleDeleteUser = async (name) =>  {
    try {
      if (name != user.name){
        await axios.put(`http://localhost:5000/removeUser?name=${name}`);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // const handleUser = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/getUserById?id=${userId}`);
  //     if (response.status === 200) {
  //       //console.log(response.data.users[0].name);
  //       setMapUser(response.data.users[0].name);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching channels:', error);
  //   }
  // };
  


  // Display posts in the UI
  return (
    <div> 
        <Link to="/">
            <button className="back-btn">Go Back to Landing Page</button>
        </Link>
        <div style={{paddingTop: "30px",display: 'flex', justifyContent: 'space-between'}}>
          <div>
              <h2>Channels</h2>
              <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
                <div className='comments-container'>
                  {channels.map((channel) => (
                  <div className="post-box" key={channel.id}>
                    <p>Sender: {channel.userName}</p>
                    <p>Channel ID: {channel.id}</p>
                    <p>Topic: {channel.topic}</p>
                    {user.isAdmin ? (
                      <div>
                        <button onClick={() => handleDeleteChannel(channel.id)}>Delete Channel</button>
                        <button onClick={() => handleDeleteUser(channel.userName)}>Delete User</button>
                      </div>
                    ) : (
                      <div>
                        {/* Render something else or nothing */}
                      </div>
                    )}
                    <button onClick={() => fetchPosts(channel.id)}>See Posts</button>
                  </div>
                ))}
                </div>
              </div>
              <CreateChannel />
          </div>
            <div style={{maxWidth: '500px'}}>
              <h2>Channel Posts</h2>
              <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
                <div className="posts-container"> {/* Apply CSS class for styling */}
                  <div>
                    {posts.map((post) => (
                      // <div style={{display: 'flex', margin: '10px', justifyContent: 'space-between'}}>
                        
                        <div className="post-box" key={post.id}> {/* Apply CSS class for post box */}
                        {/* Render post data here */}
                        <p>Sender: {post.userName}</p>
                        <p>Post ID: {post.id}</p>
                        <p>Topic: {post.topic}</p>
                        <p>Data: {post.data}</p>
                        {post.image && (
                          <img src={`http://localhost:5000/uploads/${post.image}`} alt="post Image" style={{ width: '200px', height: '150px' }}/>
                        )}
                        {user.isAdmin ? (
                          <div>
                            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                            <button onClick={() => handleDeleteUser(post.userName)}>Delete User</button>
                          </div>
                        ) : (
                          <div>
                            {/* Render something else or nothing */}
                          </div>
                        )}
                        <button onClick={() => fetchComments(post.id)}>See Replies</button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              {channelId && <CreatePost channelId={channelId}/>}
            </div>
          
          <div>
            <h2>Post Replies</h2>
            <div style={{justifyContent: 'center', maxHeight:'500px', overflowY: 'auto'}}>
              <div className='comments-container'>
                {comments.map((comment) => (
                <Comment
                key={comment.id}
                comment={comment}
                user={user}
                handleDeleteComment={handleDeleteComment}
                handleDeleteUser={handleDeleteUser}
                handleFetchChildren={handleFetchChildren}
                setParent={setParent}
                oldParent={comment.id}
              />
              ))}
              </div>
            </div>
            {postId && <CreateComment postId={postId} parent={parent} setParent={setParent}/>}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
