import React from "react";
import { useNavigate } from "react-router-dom";
import "./Animals.css";

const Animals = (props) => {
  const imageName = props.images?.[0]?.ImageData;
  const imageUrl = `http://127.0.0.1:8000/storage/uploads/${imageName}`;


  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${props.id}`, { state: props });
  };

  const handleImageLoad = (event) => {
    const img = event.target;
    const container = img.parentNode;
    const containerRatio = container.offsetWidth / container.offsetHeight;
    const imageRatio = img.naturalWidth / img.naturalHeight;

    if (imageRatio > containerRatio) {
      img.style.objectPosition = "20% center";
    } else {
      img.style.objectPosition = "center 15%";
    }
  };
  return (
    <div onClick={handleCardClick} className="animal-card">
      <div className="animal-img-placeholder">
        {imageName ? (
          <img
            src={imageUrl}
            alt={props.SpeciesName}
            className="animal-card-img"
            onLoad={handleImageLoad}
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
