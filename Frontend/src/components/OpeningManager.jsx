import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OpeningManager = () => {
    const { token } = useAuth();
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
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

    if (loading) return <div>Betöltés...</div>;



    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Nyitvatartás Kezelése</h2>
            {message && <div style={styles.alert}>{message}</div>}

            <div style={styles.table}>
                <div style={styles.header}>
                    <span>Nap</span>
                    <span>Nyitás</span>
                    <span>Zárás</span>
                    <span>Állapot</span>
                    <span>Művelet</span>
                </div>

                {openings.map((item) => (
                    <div key={item.id} style={styles.row}>
                        <span style={styles.dayName}>{item.day}</span>

                        <input
                            type="time"
                            value={item.open_time || '00:00'}
                            disabled={item.is_closed}
                            onChange={(e) => handleChange(item.id, 'open_time', e.target.value)}
                            style={styles.input}
                        />

                        <input
                            type="time"
                            value={item.close_time || '00:00'}
                            disabled={item.is_closed}
                            onChange={(e) => handleChange(item.id, 'close_time', e.target.value)}
                            style={styles.input}
                        />

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={!!item.is_closed}
                                onChange={(e) => handleChange(item.id, 'is_closed', e.target.checked ? 1 : 0)}
                            />
                            {item.is_closed ? ' Zárva' : ' Nyitva'}
                        </label>

                        <button onClick={() => handleSave(item)} style={styles.saveBtn}>Mentés</button>
                    </div>

                ))}
            </div>
            <button onClick={() => navigate("/admin")} style={styles.backBtn}>
                Vissza
            </button>
        </div>
    );
};

const styles = {
    container: { maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px' },
    table: { display: 'flex', flexDirection: 'column', gap: '10px' },
    header: { display: 'grid', gridTemplateColumns: '120px 100px 100px 100px 100px', fontWeight: 'bold', borderBottom: '2px solid #eee', paddingBottom: '10px', textAlign: 'center' },
    row: { display: 'grid', gridTemplateColumns: '120px 100px 100px 100px 100px', alignItems: 'center', padding: '10px', borderBottom: '1px solid #f9f9f9', textAlign: 'center' },
    dayName: { fontWeight: 'bold', textAlign: 'left' },
    input: { padding: '5px', borderRadius: '4px', border: '1px solid #ddd' },
    checkboxLabel: { fontSize: '14px', cursor: 'pointer' },
    saveBtn: { padding: '6px 12px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    alert: { padding: '10px', backgroundColor: '#e1f5fe', color: '#01579b', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }
};

export default OpeningManager;