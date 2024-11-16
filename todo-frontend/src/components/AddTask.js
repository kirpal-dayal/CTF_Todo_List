import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', { title })
      .then(() => {
        alert('Tarea agregada');
        navigate('/tasks');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>Agregar Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Título de la Tarea</label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default AddTask;
