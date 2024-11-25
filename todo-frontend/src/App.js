import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; 

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/tasks" className="btn btn-secondary">
              Lista de Tareas
            </Link>
            <Link to="/add-task" className="btn btn-success">
              Agregar Tarea
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth" className="btn btn-primary">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn btn-warning">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default App;
