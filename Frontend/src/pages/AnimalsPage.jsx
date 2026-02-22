import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Animals from '../components/Animals';
import '../components/Animals.css';

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]); // Eredeti teljes lista
    const [filteredAnimals, setFilteredAnimals] = useState([]); // Szűrt lista a kereséshez
    const [searchTerm, setSearchTerm] = useState(""); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AllData');
            
            // TRÜKK: Minden állatnál 0-ra állítjuk a ForSaleQuantity-t ebben a listában
            const hiddenPrices = response.data.map(animal => ({
                ...animal,
                ForSaleQuantity: 0 // Így az Animals.jsx nem fogja kiírni
            }));

            setAnimals(hiddenPrices);
            setFilteredAnimals(hiddenPrices);
        } catch (error) {
            console.error("Hiba:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchAnimals();
}, []);

    // Keresés logika: minden gépelésnél lefut
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
                    <h2>Tenyészetünk</h2>
                </div>

                {/* KERESŐSÁV - ugyanaz a stílus, mint az eladóknál */}
                <div className="animal-search-bar">
                    <label>Keresés:</label>
                    <input 
                        type="text" 
                        placeholder="Milyen madarat keresel?" 
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
                             
                              <div className="no-result-container">
                                  <p>Nincs ilyen nevű madár a tenyészetünkben.</p>
                              </div>
                          )}
                          
                      </>
                  )}
            </div>
        </Layout>
    );
};

export default AnimalsPage;