import React, { useState } from "react";
import axios from "../utils/api";
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", formData);
      const token = response.data.access_token;
      localStorage.setItem("token", token); // Guardar el token
      alert("Inicio de sesión exitoso");
    } catch (err) {
      alert(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
  
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
