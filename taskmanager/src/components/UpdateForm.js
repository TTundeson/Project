import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ taskId, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated task data to the backend
    axios
      .put(
        `http://localhost:5000/tasks/${taskId}`,
        { title, description, deadline },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then((response) => {
        console.log('Task updated successfully');
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div>
      <h3>Update Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Deadline:
          <input
            type='date'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateForm;
