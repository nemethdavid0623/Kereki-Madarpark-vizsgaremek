import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import '../components/AnimalManager.css';

const AnimalManager = () => {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.editAnimal;
  const isEditMode = !!editData;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [animalData, setAnimalData] = useState({
    SpeciesName: "",
    Quantity: 0,
    ForSaleQuantity: 0,
    Description: "",
    More: "",
    SpeciesID: 1,
    images: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (editData) {
      setAnimalData({
        ...editData,
        SpeciesName: editData.SpeciesName || "",
        Description: editData.Description || "",
        More: editData.More || "",
        Quantity: editData.Quantity || 0,
        ForSaleQuantity: editData.ForSaleQuantity || 0,
        SpeciesID: editData.SpeciesID || 1,
        images: editData.images || [],
        ID: editData.ID || editData.id,
      });
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...newFiles]);
  };

  const removeSelectedImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId) => {
    if (window.confirm("Biztosan törlöd ezt a képet a galériából?")) {
      try {
        await axios.delete(`http://localhost:8000/api/DeleteImage/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAnimalData({
          ...animalData,
          images: animalData.images.filter(
            (img) => (img.ID || img.id) !== imageId,
          ),
        });
      } catch (err) {
        console.error("Hiba a kép törlésekor:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("SpeciesName", animalData.SpeciesName);
    formData.append("Quantity", animalData.Quantity);
    formData.append("ForSaleQuantity", animalData.ForSaleQuantity);
    formData.append("Description", animalData.Description);
    formData.append("More", animalData.More);
    formData.append("SpeciesID", animalData.SpeciesID);

    selectedImages.forEach((file) => {
      formData.append("images[]", file);
    });

    if (isEditMode) {
      formData.append("_method", "PUT");
    }

    try {
      const currentID = animalData.ID || animalData.id;
      const url = isEditMode
        ? `http://localhost:8000/api/UpdateAnimal/${currentID}`
        : "http://localhost:8000/api/NewAnimal";

      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Sikeres mentés!");
      setTimeout(() => navigate("/AnimalDelete"), 1500);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      setMessage("Hiba történt a mentés során!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-container">
      <h2 className="manager-title">
        {isEditMode ? "Állat szerkesztése" : "Új állat rögzítése"}
      </h2>
      
      {message && <div className="manager-alert">{message}</div>}

      <form onSubmit={handleSubmit} className="manager-form">
        <div className="manager-row">
          <div className="manager-group flex-2">
            <label className="manager-label">Fajnév:</label>
            <input
              type="text"
              name="SpeciesName"
              value={animalData.SpeciesName}
              onChange={handleInputChange}
              className="manager-input"
              required
            />
          </div>
          <div className="manager-group flex-1">
            <label className="manager-label">Típus:</label>
            <select
              name="SpeciesID"
              value={animalData.SpeciesID}
              onChange={handleInputChange}
              className="manager-input"
            >
              <option value="1">Madár</option>
              <option value="2">Egyéb</option>
            </select>
          </div>
        </div>

        <div className="manager-row">
          <div className="manager-group">
            <label className="manager-label">Összes darab:</label>
            <input
              type="number"
              name="Quantity"
              value={animalData.Quantity}
              onChange={handleInputChange}
              className="manager-input"
              required
            />
          </div>
          <div className="manager-group">
            <label className="manager-label">Eladó darab:</label>
            <input
              type="number"
              name="ForSaleQuantity"
              value={animalData.ForSaleQuantity}
              onChange={handleInputChange}
              className="manager-input"
              required
            />
          </div>
        </div>

        <div className="manager-group">
          <label className="manager-label">Rövid leírás:</label>
          <textarea
            name="Description"
            value={animalData.Description}
            onChange={handleInputChange}
            className="manager-input manager-textarea"
            required
          />
        </div>

        <div className="manager-group">
          <label className="manager-label">További információk:</label>
          <textarea
            name="More"
            value={animalData.More}
            onChange={handleInputChange}
            className="manager-input manager-textarea"
            required
          />
        </div>

        <hr className="manager-hr" />

        {isEditMode && animalData.images.length > 0 && (
          <div className="manager-group">
            <label className="manager-label">Szerveren lévő galéria:</label>
            <div className="manager-gallery-grid">
              {animalData.images.map((img) => (
                <div key={img.ID || img.id} className="manager-image-wrapper">
                  <img
                    src={`http://localhost:8000/storage/uploads/${img.ImageData}`}
                    alt="existing"
                    className="manager-thumbnail"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(img.ID || img.id)}
                    className="manager-delete-badge"
                    title="Kép törlése"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedImages.length > 0 && (
          <div className="manager-group">
            <label className="manager-label">Új képek feltöltésre:</label>
            <div className="manager-gallery-grid">
              {selectedImages.map((file, index) => (
                <div key={index} className="manager-image-wrapper">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="new-preview"
                    className="manager-thumbnail new-image"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedImage(index)}
                    className="manager-delete-badge"
                    title="Eltávolítás"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="manager-group">
          <label className="manager-label">Képek hozzáadása:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="manager-file-input"
          />
        </div>

        <button type="submit" disabled={loading} className="manager-btn manager-submit-btn">
          {loading ? "Mentés folyamatban..." : isEditMode ? "Módosítások mentése" : "Állat rögzítése"}
        </button>

        <button 
          type="button" 
          onClick={() => navigate("/admin")} 
          className="manager-btn manager-back-btn"
        >
          Mégse / Vissza
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={() => navigate("/AnimalDelete")}
            className="manager-btn manager-cancel-btn"
          >
            Vissza a kezeléshez
          </button>
        )}
      </form>
    </div>
  );
};

export default AnimalManager;