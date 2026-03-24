import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
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
            console.error("Hiba az adatok lekérésekor:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt az állatot és az összes hozzá tartozó képet?")) {
            try {
                await axios.delete(`http://localhost:8000/api/DeleteAnimal/${id}`);
                setAnimals(prev => prev.filter(animal => animal.ID !== id && animal.id !== id));
                alert("Sikeres törlés!");
            } catch (error) {
                console.error("Törlési hiba:", error);
                alert("Hiba történt a törlés során.");
            }
        }
    };

    if (loading) return <div className="loader">Adatok betöltése...</div>;

    return (
        <div className="delete-container">
            <h2 className="delete-title">Állatállomány Kezelése</h2>

            <table className="animal-table">
                <thead>
                    <tr>
                        <th>Kép</th>
                        <th>Fajnév</th>
                        <th>Típus</th>
                        <th>Állomány</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id || animal.ID}>
                            <td data-label="Kép">
                                {animal.images && animal.images.length > 0 ? (
                                    <img
                                        src={`http://localhost:8000/storage/uploads/${animal.images[0].ImageData}`}
                                        alt="preview"
                                        className="preview-img"
                                    />
                                ) : (
                                    <div className="no-img">Nincs kép</div>
                                )}
                            </td>
                            <td data-label="Fajnév"><strong>{animal.SpeciesName}</strong></td>
                            <td data-label="Típus">{animal.SpeciesID === 1 ? 'Madár' : 'Egyéb'}</td>
                            <td data-label="Állomány">{animal.Quantity} db</td>
                            <td data-label="Műveletek">
                                <button
                                    onClick={() => navigate('/AnimalInput', { state: { editAnimal: animal } })}
                                    className="btn edit-btn"
                                >
                                    Szerkesztés
                                </button>
                                <button
                                    onClick={() => handleDelete(animal.id || animal.ID)}
                                    className="btn delete-btn"
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {animals.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>Nincs megjeleníthető adat.</p>}

            <button onClick={() => navigate("/admin")} className="btn back-btn">
                Vissza
            </button>
        </div>
    );
};

export default AnimalDelete;