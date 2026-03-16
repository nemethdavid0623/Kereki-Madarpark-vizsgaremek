import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpeningDisplay = () => {
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/openings')
            .then(res => {
                setOpenings(res.data);
                checkIfOpenNow(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Hiba:", err);
                setLoading(false);
            });
    }, []);


    const checkIfOpenNow = (data) => {
        const now = new Date();
        const dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
        const currentDayName = dayNames[now.getDay()];


        const todayData = data.find(item => item.day === currentDayName);

        if (!todayData || todayData.is_closed) {
            setIsCurrentlyOpen(false);
            return;
        }

        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openHour, openMinute] = todayData.open_time.split(':');
        const [closeHour, closeMinute] = todayData.close_time.split(':');

        const openTime = parseInt(openHour) * 60 + parseInt(openMinute);
        const closeTime = parseInt(closeHour) * 60 + parseInt(closeMinute);

        setIsCurrentlyOpen(currentTime >= openTime && currentTime < closeTime);
    };

    if (loading) return <div>Betöltés...</div>;

    return (
        <div style={styles.container}>

            <div style={{
                ...styles.statusBadge,
                backgroundColor: isCurrentlyOpen ? '#2ecc71' : '#e74c3c'
            }}>
                {isCurrentlyOpen ? '● NYITVA VAGYUNK' : '● ZÁRVA VAGYUNK'}
            </div>

            <h3 style={styles.title}>Heti nyitvatartás</h3>
            <div style={styles.grid}>
                {openings.map(day => (
                    <div
                        key={day.id}
                        style={{
                            ...styles.card,
                            ...(day.is_closed ? styles.closedCard : {}),
                            ...(isToday(day.day) ? styles.todayCard : {})
                        }}
                    >
                        <span style={styles.dayName}>{day.day}</span>
                        <span style={styles.timeRange}>
                            {day.is_closed
                                ? 'ZÁRVA'
                                : `${day.open_time ? day.open_time.slice(0, 5) : '--:--'} - ${day.close_time ? day.close_time.slice(0, 5) : '--:--'}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const isToday = (dayName) => {
    const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    const today = days[new Date().getDay()];
    return today === dayName;
};

const styles = {
    container: { maxWidth: '400px', margin: '20px auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' },
    title: { textAlign: 'center', color: '#2c3e50', marginBottom: '15px' },
    statusBadge: {
        padding: '10px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '18px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    grid: { display: 'flex', flexDirection: 'column', gap: '8px' },
    card: {
        display: 'flex', justifyContent: 'space-between',
        padding: '10px 15px', backgroundColor: '#e8f6ef',
        borderRadius: '8px', borderLeft: '4px solid #2ecc71',
        fontWeight: 'bold', color: '#27ae60'
    },
    closedCard: {
        backgroundColor: '#f8d7da', borderLeft: '4px solid #e74c3c', color: '#c0392b'
    },
    todayCard: {
        boxShadow: '0 0 10px rgba(46, 204, 113, 0.5)', border: '1px solid #2ecc71'
    },
    dayName: { flex: 1 },
    timeRange: { fontWeight: 'normal' }
};

export default OpeningDisplay;