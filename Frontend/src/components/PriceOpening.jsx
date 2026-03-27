import React from "react";
import Layout from "./Layout";
import OpeningDisplay from "./OpeningDisplay";
import "./PriceOpening.css";

const PriceOpening = () => {
  const price = [
    "Teljesárú 3.200Ft/fő",
    "Nyugdíjas, diák és pedagógus jegy 2.700Ft/fő",
    "Gyermek 18 évig (2év alatt ingyenes) 2.300Ft/fő",
    "Támogató jegy 6.000Ft/fő",
    "Kiscsoportos kedvezmény, 4 főtől 10%",
    "Csoportos kedvezmény, 15 fő felett 20%",
    "Óvodai, iskolai csoportok esetén 10 gyerek után 2 fő felnőtt kísérő ingyenes",
    "Kereki lakosainak számára 2022-től díjmentes a belépés",
    "A szomszédos települések lakói (Balatonföldvár, Kőröshegy, Bálványos, Pusztaszemes, Szántód, Zamárdi) 20% kedvezményt kapnak a belépőárakból"
  ];

  return (
    <Layout>
      <div className="rules-page-content">

        <div className="rules-header-banner">
          <h2>Árak és nyitvatartás</h2>
        </div>


        <div className="rules-text-container">
          <div className="rules-flex-layout">
            
            <div className="price-section">
              <h2 className="section-title">Áraink</h2>
              <ul className="rules-list">
                {price.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="opening-section">
              <h2 className="section-title">Nyitvatartás</h2>
              <OpeningDisplay />
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceOpening;