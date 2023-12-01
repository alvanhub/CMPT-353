import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 

const CreatePost = (channelId) => {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    //console.log(channelId.channelId);
    try {
      const response = await axios.post(`http://localhost:5000/addPost?topic=${topic}&data=${data}&channel_id=${channelId.channelId}`, formData);
      if (response.status === 200) {
        //const data = await response.json();
        //console.log(data.comments)
        //console.log(data);
        setTopic('');
        setData('');
      }
    } catch (error) {
      console.error('Error adding posts:', error);
    }

  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    //console.log(e.target.files[0]);
    setImage(file);
  };

  return (
    <div>
      <h2>Add a Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <label>
          Message
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreatePost;
