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
      setTimeout(() => navigate("/AnimalDelete"), 2000);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      setMessage("Hiba történt a mentés során!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          {isEditMode ? "Állat szerkesztése" : "Új állat rögzítése"}
        </h2>
        {message && <div style={styles.alert}>{message}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={{ flex: 2 }}>
              <label style={styles.label}>Fajnév:</label>
              <input
                type="text"
                name="SpeciesName"
                value={animalData.SpeciesName}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Típus:</label>
              <select
                name="SpeciesID"
                value={animalData.SpeciesID}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="1">Madár</option>
                <option value="2">Egyéb</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Összes db:</label>
              <input
                type="number"
                name="Quantity"
                value={animalData.Quantity}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Eladó db:</label>
              <input
                type="number"
                name="ForSaleQuantity"
                value={animalData.ForSaleQuantity}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <label style={styles.label}>Rövid leírás:</label>
          <textarea
            name="Description"
            value={animalData.Description}
            onChange={handleInputChange}
            style={{ ...styles.input, height: "80px" }}
            required
          />

          <label style={styles.label}>További információk:</label>
          <textarea
            name="More"
            value={animalData.More}
            onChange={handleInputChange}
            style={{ ...styles.input, height: "80px" }}
            required
          />

          <hr style={styles.hr} />

          {isEditMode && animalData.images.length > 0 && (
            <div>
              <label style={styles.label}>Szerveren lévő galéria:</label>
              <div style={styles.galleryGrid}>
                {animalData.images.map((img) => (
                  <div key={img.ID || img.id} style={styles.imageWrapper}>
                    <img
                      src={`http://localhost:8000/storage/uploads/${img.ImageData}`}
                      alt="old"
                      style={styles.thumbnail}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteExistingImage(img.ID || img.id)
                      }
                      style={styles.deleteBadge}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedImages.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <label style={styles.label}>Új képek feltöltésre:</label>
              <div style={styles.galleryGrid}>
                {selectedImages.map((file, index) => (
                  <div key={index} style={styles.imageWrapper}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="new"
                      style={{ ...styles.thumbnail, borderColor: "#2ecc71" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                      style={styles.deleteBadge}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label style={styles.label}>Képek hozzáadása:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            style={styles.fileInput}
          />

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading
              ? "Mentés..."
              : isEditMode
                ? "Módosítások mentése"
                : "Állat rögzítése"}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={() => navigate("/AnimalDelete")}
              style={styles.cancelBtn}
            >
              Mégse
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#126a18",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",

  },
  title: { textAlign: "center", color: "white", marginBottom: "25px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  label: {
    display: "block",
    marginBottom: "3px",
    fontWeight: "bold",
    color: "white",
    fontSize: "14px",
  },
  row: { display: "flex", gap: "15px", flexWrap: "wrap" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid black",
    width: "100%",
    boxSizing: "border-box",
    color: "#000",
  },
  hr: { border: "0", borderTop: "2px solid #000000", margin: "20px 0" },
  galleryGrid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  imageWrapper: { position: "relative", display: "inline-block" },
  thumbnail: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #eee",
  },
  deleteBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileInput: {
    padding: "10px",
    border: "2px dashed white",
    borderRadius: "8px",
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  submitBtn: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f6ff00",
    color: "black",
    border: "none",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelBtn: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  alert: {
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#d1ecf1",
    color: "#0c5460",
    textAlign: "center",
  },
};

export default AnimalManager;
