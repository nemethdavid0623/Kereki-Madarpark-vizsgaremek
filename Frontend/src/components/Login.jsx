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
        <h2 style={styles.h2}>Admin Belépés</h2>
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

          <button onClick={() => navigate("/")} style={styles.backBtn}>
          Vissza
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
  },

  h2:{
    color:"white",
    textAlign:"center"
  },

  card: {
    padding: "2rem",
    backgroundColor: "rgba(18, 106, 24, 0.5)",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "300px",
    border: "1px solid black"
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.8rem", borderRadius: "4px", border: "1px solid #ccc" },
  button: {
    padding: "0.8rem",
    backgroundColor: "#f6ff00",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "0.9rem", marginBottom: "1rem" },
    backBtn: { 
    backgroundColor: '#dc3545', 
    color: 'black', 
    border: 'none', 
    padding: '8px 15px', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    margin:"auto", 
    display:"flex",
    marginTop:"2%", 
    justifyContent:"center",
    width:"100%",
}
};

export default Login;
