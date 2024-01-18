import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send task data to the backend
    axios
      .post(
        'http://localhost:5000/tasks',
        { title, description, deadline },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then(() => {
        console.log('Task created successfully');
        // Optionally, update the task list after submission
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
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
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
