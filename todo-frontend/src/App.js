// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <nav>
        <Link to="/auth" className="btn btn-primary">Iniciar Sesión</Link>
        <Link to="/tasks" className="btn btn-secondary">Lista de Tareas</Link>
        <Link to="/add-task" className="btn btn-success">Agregar Tarea</Link>
      </nav>
    </div>
  );
};

export default App;
