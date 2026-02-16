import React from "react";
import "./Animals.css";

const Animals = (props) => {
  // A JSON alapján props.images[0].ImageData-t keresünk
  const imageName = props.images?.[0]?.ImageData;
  const imageUrl = `http://127.0.0.1:8000/storage/uploads/${imageName}`;

  return (
    <div className="animal-card">
      <div className="animal-img-placeholder">
        {/* JAVÍTÁS: Itt imageName-t kell vizsgálni, nem props.image-et! */}
        {imageName ? (
          <img
            src={imageUrl}
            alt={props.SpeciesName}
            className="bird-card-img"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200?text=Hiba+a+betöltéskor";
            }}
          />
        ) : (
          <span className="no-image-text">Nincs kép!</span>
        )}
      </div>
      <div className="animal-label">
        <p>{props.SpeciesName}</p>
      </div>
    </div>
  );
};

export default Animals;
