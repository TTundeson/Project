import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm'; // Import the UpdateForm component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'inProgress'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('deadline'); // 'deadline', 'priority'

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

  const handleUpdate = (taskId) => {
    // Set selected task for update
    setSelectedTask(taskId);
  };

  const handleDelete = (taskId) => {
    // Implement delete logic
    // ... (existing code)

    const handleDelete = (taskId) => {
      // Send delete request to the backend
      axios
        .delete(`http://localhost:5000/tasks/${taskId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        })
        .then(() => {
          console.log('Task deleted successfully');
          // Update the task list after deletion
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskId)
          );
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    };

    // ... (existing code)
  };

  const handleUpdateFormClose = () => {
    // Close the update form
    setSelectedTask(null);
  };

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
            <button onClick={() => handleUpdate(task._id)}>Update</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            {selectedTask === task._id && (
              <UpdateForm taskId={task._id} onUpdate={handleUpdateFormClose} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

return (
    <div>
      <h2>Your Tasks</h2>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
        </label>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Sort by:
          <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <ul>
        {tasks
          .filter((task) => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.status === 'Completed';
            if (filter === 'inProgress') return task.status === 'In Progress';
            return true;
          })
          .filter((task) => {
            // Implement search logic
            return (
              task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .sort((a, b) => {
            // Implement sorting logic
            if (sortCriteria === 'deadline') {
              return new Date(a.deadline) - new Date(b.deadline);
            }
            // Add additional sorting criteria as needed
            return 0;
          })
          .map((task) => (
            <li key={task._id}>
              {/* ... (existing code) */}
            </li>
          ))}
      </ul>
      {/* ... (existing code) */}
    </div>
  );
};

export default TaskList;
