import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";

const LargeCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state || {};
  

  const images = props.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Layout>
      <div className="animal-card">
        <div className="animal-img-placeholder" style={styles.slideshowContainer}>
          {images.length > 0 ? (
            <>
              <img
                src={`http://127.0.0.1:8000/storage/uploads/${images[currentIndex]?.ImageData}`}
                alt={`${props.SpeciesName} ${currentIndex + 1}`}
                className="animal-card-img"
                style={styles.largeImage}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Hiba+a+betöltéskor";
                }}
              />

              {images.length > 1 && (
                <>
                  <button onClick={prevSlide} style={styles.prevBtn}>&#10094;</button>
                  <button onClick={nextSlide} style={styles.nextBtn}>&#10095;</button>
                  <div style={styles.counter}>
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </>
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
          <div className="description">
            <p>{props.Description}</p>
          </div>
          <div className="additional-info">
            <p>További információkért kattintson <a href={props.More} target="_blank" rel="noreferrer">ide</a>.</p>
          </div>
          <div>
            <button onClick={() => navigate("/Animals")} style={styles.backBtn}>
              Vissza
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  slideshowContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden'
  },
  largeImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  prevBtn: {
    position: 'absolute',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    padding: '15px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '20px'
  },
  nextBtn: {
    position: 'absolute',
    right: '10px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    padding: '15px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '20px'
  },
  counter: {
    position: 'absolute',
    bottom: '10px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '14px'
  },
  backBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: "20px",
    width: "100%",
  }
};

export default LargeCard;
