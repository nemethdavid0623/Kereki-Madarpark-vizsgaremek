import React from 'react';
import Layout from './Layout';
import './Rules.css';

const Rules = () => {
  const ruleList = [
    "A madarakat etetni szigorúan tilos, kivéve a kijelölt helyeken vásárolt eledellel!",
    "Kérjük, ne hangoskodjanak, ne zavarják az állatok nyugalmát.",
    "A kert területén a dohányzás tilos!",
    "Kutyát csak pórázon, a szabályok betartásával lehet behozni.",
    "Kérjük, ügyeljenek a tisztaságra, használják a kihelyezett hulladékgyűjtőket.",
    "A növényeket letépni vagy megrongálni tilos!"
  ];

  return (
    <Layout>
      <div className="rules-page-content">
        <div className="header-banner">
          <h2>Házirend</h2>
        </div>

        <div className="rules-text-container">
          <ul className="rules-list">
            {ruleList.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;