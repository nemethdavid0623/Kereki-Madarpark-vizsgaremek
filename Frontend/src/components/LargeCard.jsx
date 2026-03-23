import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import "./LargeCard.css"; // Importáljuk az új CSS-t

const LargeCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state || {};

  const images = props.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Itt használd a korábban megbeszélt IP címet a 127.0.0.1 helyett, ha kell!
  const BASE_URL = "http://127.0.0.1:8000/storage/uploads/";

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Layout>
      <div className="animal-card-container">
        {/* Slideshow Rész */}
        <div className="slideshow-container">
          {images.length > 0 ? (
            <>
              <img
                src={`${BASE_URL}${images[currentIndex]?.ImageData}`}
                alt={`${props.SpeciesName} ${currentIndex + 1}`}
                className="large-animal-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Kép+nem+elérhető";
                }}
              />

              {images.length > 1 && (
                <>
                  <button onClick={prevSlide} className="nav-btn prev-btn">&#10094;</button>
                  <button onClick={nextSlide} className="nav-btn next-btn">&#10095;</button>
                  <div className="image-counter">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="no-image-text">Nincs kép!</div>
          )}
        </div>

        {/* Információs Rész */}
        <div className="animal-detail-info">
          <h2>{props.SpeciesName}</h2>

          {props.ForSaleQuantity > 0 && (
            <div className="for-sale-badge">
              Eladó: {props.ForSaleQuantity} db
            </div>
          )}

          <div className="detail-description">
            <p>{props.Description}</p>
          </div>

          <div className="additional-info">
            <p>
              További információkért kattintson{" "}
              <a href={props.More} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-yellow)' }}>
                ide
              </a>.
            </p>
          </div>

          <button onClick={() => navigate("/Animals")} className="back-to-animals-btn">
            Vissza a tenyészethez
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LargeCard;