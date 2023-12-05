import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 

const CreateChannel = () => {
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const user = JSON.parse(localStorage.getItem("token"));
      //console.log(user);
      const response = await axios.post(`http://localhost:5000/addChannel?topic=${topic}&userName=${user.name}`, );
      if (response.status === 200) {
        //const data = await response.json();
        //console.log(data.comments)
        //console.log(data);
        setTopic('');
      }
    } catch (error) {
      console.error('Error adding channel:', error);
    }

  };

  return (
    <div>
      <h2>Add a Channel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateChannel;
