import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OpeningDisplay.css';

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

    const isToday = (dayName) => {
        const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
        const today = days[new Date().getDay()];
        return today === dayName;
    };

    if (loading) return <div className="opening-container">Betöltés...</div>;

    return (
        <div className="opening-container">
            <div className={`status-badge ${isCurrentlyOpen ? 'status-open' : 'status-closed'}`}>
                {isCurrentlyOpen ? '● NYITVA VAGYUNK' : '● ZÁRVA VAGYUNK'}
            </div>

            <h3 className="opening-title">Heti nyitvatartás</h3>
            
            <div className="opening-grid">
                {openings.map(day => (
                    <div
                        key={day.id}
                        className={`
                            opening-card 
                            ${day.is_closed ? 'closed' : ''} 
                            ${isToday(day.day) ? 'today' : ''}
                        `}
                    >
                        <span className="day-name">{day.day}</span>
                        <span className="time-range">
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

export default OpeningDisplay;