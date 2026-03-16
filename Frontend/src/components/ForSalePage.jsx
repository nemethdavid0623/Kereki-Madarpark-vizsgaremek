import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Animals from '../components/Animals';
import '../components/Animals.css';

const ForSalePage = () => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const [placeholder, setPlaceholder] = useState("");
    const suggestions = ["Papagáj...", "Nimfa...", "Hullámos...", "Ara...", "Sándor...", "Bagoly...", "Görény..."]

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/AllData');

                const forSaleOnly = response.data.filter(animal => animal.ForSaleQuantity > 0);
                setAnimals(forSaleOnly);
                setFilteredAnimals(forSaleOnly);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);


    useEffect(() => {
        const results = animals.filter(animal =>
            animal.SpeciesName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnimals(results);
    }, [searchTerm, animals]);

    useEffect(() => {
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        const type = () => {
            const currentFullWord = suggestions[currentWordIndex];

            if (isDeleting) {
                setPlaceholder(currentFullWord.substring(0, currentCharIndex - 1));
                currentCharIndex--;
                typingSpeed = 100;
            } else {
                setPlaceholder(currentFullWord.substring(0, currentCharIndex + 1));
                currentCharIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && currentCharIndex === currentFullWord.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % suggestions.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        const timeoutId = setTimeout(type, typingSpeed);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Layout>
            <div className="animal-page-wrapper">
                <div className="header-banner">
                    <h2>Eladó példányaink</h2>
                </div>
                <div className="animal-search-bar">
                    <label>Keresés fajnév alapján:</label>
                    <input
                        type="text"
                        placeholder={searchTerm === "" ? placeholder : "Keresés..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p style={{ color: "white", textAlign: "center" }}>Betöltés...</p>
                ) : (
                    <>
                        {filteredAnimals.length > 0 ? (
                            <div className="animal-grid">
                                {filteredAnimals.map((animal) => (
                                    <Animals key={animal.id || animal.ID} {...animal} />
                                ))}
                            </div>
                        ) : (

                            <div className="no-result-container">
                                Nincs ilyen nevű madár a tenyészetünkben.
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ForSalePage;