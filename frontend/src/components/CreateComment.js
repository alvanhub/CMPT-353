import React, { useState } from 'react';
import './styles.css'; 
import imageCompression from 'browser-image-compression';
import axios from 'axios';

const CreateComment = (postId) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    //console.log(postId);
    try {
      const response = await axios.post(`http://localhost:5000/addComment?text=${text}&postId=${postId.postId}`,formData)
      if (response.status === 200) {
        //const data = await response.json();
        //console.log(data.comments)
        //console.log(data);
        setText('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding comments:', error);
    }

  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    //console.log(e.target.files[0]);
    setImage(file);
  };

  return (
    <div>
      <h2>Add a Comment/Reply</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Message
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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

export default CreateComment;
