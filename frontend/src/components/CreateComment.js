import React, { useState, useEffect } from 'react';
import './styles.css'; 
import imageCompression from 'browser-image-compression';
import axios from 'axios';

const CreateComment = ({postId, parent, setParent}) => {
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
      const user = JSON.parse(localStorage.getItem("token"));
      let url;
      if (parent.id){
        url = `http://localhost:5000/addComment?text=${text}&postId=${postId}&userName=${user.name}&parentId=${parent.id}`;
      }else {
        url = `http://localhost:5000/addComment?text=${text}&postId=${postId}&userName=${user.name}`;
      }
      const response = await axios.post(url,formData)
      if (response.status === 200) {
        //const data = await response.json();
        //console.log(data.comments)
        //console.log(data);
        setParent({});
        setText('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding comments:', error);
    }

  };

  useEffect(() => {
    // console.log(parent);
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    //console.log(e.target.files[0]);
    setImage(file);
  };

  return (
    <div>
      <h2>Add a Comment</h2>
      {parent && <div>replying to {parent.userName}</div>}
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
            value={image}
            onChange={(e) => handleImageChange(e)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateComment;
