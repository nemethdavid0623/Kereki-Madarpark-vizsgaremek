import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Animals from '../components/Animals';
import '../components/Animals.css';

const ForSalePage = () => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]); // A szűrt lista
    const [searchTerm, setSearchTerm] = useState(""); // A keresőmező értéke
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/AllData');
                // Alapból csak az eladókat kérjük le
                const forSaleOnly = response.data.filter(animal => animal.ForSaleQuantity > 0);
                setAnimals(forSaleOnly); // Itt megmarad az eredeti darabszám, tehát ki fogja írni
                setFilteredAnimals(forSaleOnly); // Kezdéskor a szűrt lista ugyanaz
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);

    // Keresés figyelése
    useEffect(() => {
        const results = animals.filter(animal =>
            animal.SpeciesName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnimals(results);
    }, [searchTerm, animals]);

    return (
        <Layout>
            <div className="animal-page-wrapper">
                <div className="header-banner">
                    <h2>Eladó példányaink</h2>
                </div>

                {/* KERESŐSÁV */}
                <div className="animal-search-bar">
                    <label>Keresés fajnév alapján:</label>
                    <input 
                        type="text" 
                        placeholder="Pl: Papagáj..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p style={{color: "white", textAlign: "center"}}>Betöltés...</p>
                ) : (
                    <>
                        {filteredAnimals.length > 0 ? (
                            <div className="animal-grid">
                                {filteredAnimals.map((animal) => (
                                    <Animals key={animal.id || animal.ID} {...animal} />
                                ))}
                            </div>
                        ) : (
                            /* Adjunk neki egy osztályt, amit a CSS-ben megformáztunk */
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