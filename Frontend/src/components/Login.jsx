import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

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
        credentials,
      );

      login(response.data.user, response.data.token);

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Hibás felhasználónév vagy jelszó",
      );
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div style={styles.card}>
        <h2>Admin Belépés</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "300px",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.8rem", borderRadius: "4px", border: "1px solid #ccc" },
  button: {
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "0.9rem", marginBottom: "1rem" },
};

export default Login;
