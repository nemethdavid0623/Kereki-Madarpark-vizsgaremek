import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './OpeningManager.css'; // CSS importálása

const OpeningManager = () => {
    const { token } = useAuth();
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOpenings();
    }, []);

    const fetchOpenings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/openings');
            setOpenings(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Hiba a betöltéskor:", error);
            setLoading(false);
        }
    };

    const handleChange = (id, field, value) => {
        setOpenings(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async (dayData) => {
        setMessage(`Mentés: ${dayData.day}...`);
        try {
            await axios.put(`http://localhost:8000/api/openings/${dayData.id}`, dayData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessage(`${dayData.day} sikeresen frissítve!`);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Hiba a mentéskor:", error);
            setMessage("Hiba történt a mentés során.");
        }
    };

    if (loading) return <div className="manager-container">Betöltés...</div>;

    return (
        <div className="manager-container">
            <h2 className="manager-title">Nyitvatartás Kezelése</h2>
            
            {message && <div className="manager-alert">{message}</div>}

            <div className="manager-table">
                <div className="table-header">
                    <span>Nap</span>
                    <span>Nyitás</span>
                    <span>Zárás</span>
                    <span>Állapot</span>
                    <span>Művelet</span>
                </div>

                {openings.map((item) => (
                    <div key={item.id} className="table-row">
                        <span className="day-column">{item.day}</span>

                        <input
                            type="time"
                            className="time-input"
                            value={item.open_time || '00:00'}
                            disabled={!!item.is_closed}
                            onChange={(e) => handleChange(item.id, 'open_time', e.target.value)}
                        />

                        <input
                            type="time"
                            className="time-input"
                            value={item.close_time || '00:00'}
                            disabled={!!item.is_closed}
                            onChange={(e) => handleChange(item.id, 'close_time', e.target.value)}
                        />

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={!!item.is_closed}
                                onChange={(e) => handleChange(item.id, 'is_closed', e.target.checked ? 1 : 0)}
                            />
                            {item.is_closed ? 'Zárva' : 'Nyitva'}
                        </label>

                        <button 
                            onClick={() => handleSave(item)} 
                            className="save-btn"
                        >
                            Mentés
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/admin")} className="back-btn">
                Vissza az admin felületre
            </button>
        </div>
    );
};

export default OpeningManager;