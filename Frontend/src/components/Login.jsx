import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // CSS importálása

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        credentials
      );

      login(response.data.user, response.data.token);
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Hibás felhasználónév vagy jelszó"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Belépés</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Bejelentkezés
          </button>

          <button 
            type="button" 
            onClick={() => navigate("/")} 
            className="back-btn"
          >
            Vissza
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;