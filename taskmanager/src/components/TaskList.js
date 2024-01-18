import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get('http://localhost:5000/tasks', {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
