
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Auth from './components/Auth';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/add-task" element={<AddTask />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
