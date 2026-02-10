import React from "react";
import "./Animals.css";

const Animals = (props) => {
  return (
    <div className="animal-card">
      <div className="animal-img-placeholder">
        {props.image ? (
          <img src={props.image} alt={props.SpeciesName} />
        ) : (
          "kép"
        )}
      </div>
      <div className="animal-label">
        <p>{props.SpeciesName}</p>
      </div>
    </div>
  );
};

export default Animals;
