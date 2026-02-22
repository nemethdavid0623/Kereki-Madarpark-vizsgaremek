import React from "react";
import "./Animals.css";

const Animals = (props) => {
  // A JSON alapján props.images[0].ImageData-t keresünk
  const imageName = props.images?.[0]?.ImageData;
  const imageUrl = `http://127.0.0.1:8000/storage/uploads/${imageName}`;

  // ... a kód eleje (imageUrl generálás) változatlan ...

  return (
    <div className="animal-card">
      <div className="animal-img-placeholder">
        {imageName ? (
          <img
            src={imageUrl}
            alt={props.SpeciesName}
            className="animal-card-img"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200?text=Hiba+a+betöltéskor";
            }}
          />
        ) : (
          <span className="no-image-text">Nincs kép!</span>
        )}
      </div>
      <div className="animal-label">
        <div className="label-content">
          <p className="species-name">{props.SpeciesName}</p>
          {/* Csak ha több mint 0 eladó példány van */}
          {props.ForSaleQuantity > 0 && (
            <div className="for-sale-count">
              Eladó: {props.ForSaleQuantity} db
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Animals;
