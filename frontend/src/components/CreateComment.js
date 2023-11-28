import React, { useState } from 'react';
import './styles.css'; 

const CreateComment = (postId) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(postId);
    try {
      const response = await fetch(`http://localhost:5000/addComment?text=${text}&postId=${postId.postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.status === 200) {
        //const data = await response.json();
        //console.log(data.comments)
        //console.log(data);
        setText('');
      }
    } catch (error) {
      console.error('Error adding comments:', error);
    }

  };

  return (
    <div>
      <h2>Add a Comment/Reply</h2>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateComment;
