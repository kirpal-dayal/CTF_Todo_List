import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Reemplazar con tu endpoint del Task Service
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
