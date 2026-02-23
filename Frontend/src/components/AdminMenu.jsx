import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimalDelete from "./AnimalDelete";
import '../components/AdminMenu.css';

const AdminMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout");
    } catch (error) {
      console.error("Szerver hiba a kijelentkezéskor:", error.response?.data);
    } finally {
      logout();
      navigate("/Login");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Vezérlőpult</h1>
      <div style={styles.menuBox}>
        <button onClick={() => navigate("/AnimalInput")} style={styles.menuBtn}>
          Új állat rögzítése
        </button>

        <button
          onClick={() => navigate("/AnimalDelete")}
          style={styles.menuBtn}
        >
          Állomány kezelése (Szerk./Törlés)
        </button>

        <hr style={styles.hr} />

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Biztonságos Kijelentkezés
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px 20px",
    opacity: "100%",
    textAlign: "center",
    minHeight: "100vh",
  },
  title: { color: "white", marginBottom: "30px" },
  menuBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#126a18",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  menuBtn: {
    padding: "12px",
    backgroundColor: "#f6ff00",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "black",
    border: "none",
    padding: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  hr: { border: "0", borderTop: "1px solid #eee", margin: "10px 0" },
};

export default AdminMenu;
