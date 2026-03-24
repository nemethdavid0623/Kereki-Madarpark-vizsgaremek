import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
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
    <div className="admin-container">
      <h1 className="admin-title">Admin Vezérlőpult</h1>
      
      <div className="admin-menu-box">
        <button 
          onClick={() => navigate("/AnimalInput")} 
          className="admin-btn admin-menu-btn"
        >
          Új állat rögzítése
        </button>

        <button
          onClick={() => navigate("/AnimalDelete")}
          className="admin-btn admin-menu-btn"
        >
          Állomány kezelése (Szerk./Törlés)
        </button>

        <button
          onClick={() => navigate("/admin/openings")}
          className="admin-btn admin-menu-btn"
        >
          Nyitvatartási idő szerkesztése
        </button>

        <hr className="admin-hr" />

        <button onClick={handleLogout} className="admin-btn admin-logout-btn">
          Biztonságos Kijelentkezés
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;