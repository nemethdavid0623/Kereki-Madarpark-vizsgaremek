import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AnimalDelete.css';

const AnimalDelete = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AllData');
            setAnimals(response.data);
        } catch (error) {
            console.error("Hiba:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd?")) {
            try {
                await axios.delete(`http://localhost:8000/api/DeleteAnimal/${id}`);
                setAnimals(prev => prev.filter(a => (a.id || a.ID) !== id));
            } catch (error) {
                alert("Hiba a törlés során.");
            }
        }
    };

    if (loading) return <div className="loader">Betöltés...</div>;

    return (
        <div className="delete-container">
            <h2 className="delete-title">Állatállomány Kezelése</h2>

            <div className="animal-list-container">
                <div className="list-header">
                    <div className="col col-img">Kép</div>
                    <div className="col">Fajnév</div>
                    <div className="col">Típus</div>
                    <div className="col">Állomány</div>
                    <div className="col col-actions">Műveletek</div>
                </div>

                {animals.map((animal) => (
                    <div key={animal.id || animal.ID} className="list-item">
                        <div className="col col-img" data-label="Kép:">
                            {animal.images?.length > 0 ? (
                                <img
                                    src={`http://localhost:8000/storage/uploads/${animal.images[0].ImageData}`}
                                    alt="animal"
                                    className="preview-img"
                                />
                            ) : (
                                <div className="no-img">Nincs kép</div>
                            )}
                        </div>
                        
                        <div className="col" data-label="Fajnév:">
                            <strong>{animal.SpeciesName}</strong>
                        </div>
                        
                        <div className="col" data-label="Típus:">
                            {animal.SpeciesID === 1 ? 'Madár' : 'Egyéb'}
                        </div>
                        
                        <div className="col" data-label="Állomány:">
                            {animal.Quantity} db
                        </div>
                        
                        <div className="col col-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/AnimalInput', { state: { editAnimal: animal } })}
                                className="btn edit-btn"
                            >
                                Szerkesztés
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(animal.id || animal.ID)}
                                className="btn delete-btn"
                            >
                                Törlés
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" onClick={() => navigate("/admin")} className="btn back-btn">
                Vissza
            </button>
        </div>
    );
};

export default AnimalDelete;