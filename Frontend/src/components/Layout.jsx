import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
  return (
    <div className="main-wrapper">
      <img src="/madarpark_header.png" alt="Balatoni Madárkert" className='header-img' />

      <nav className="header-banner-nav">
        <ul className="nav-links">
          <Link to="http://localhost:5173/"><img src="/logo.png" alt="" className='logo' /></Link>
          <li><Link to="/Animals">Tenyészetünk</Link></li>
          <li><Link to="/ForSalePage">Eladó példányaink</Link></li>
          <li><Link to="/Rules">Házirend</Link></li>
          <li><Link to="/PriceOpening">Árak és nyitvatartás</Link></li>
          <li><a href="/Login">Admin</a></li>
        </ul>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-content">
          {/* Elérhetőségek oszlop */}
          <div className="footer-section">
            <h3>Kapcsolat</h3>
            <p><strong>Tulajdonosok:</strong> Rácz Sándor & Rácz Sándorné</p>
            <p><strong>Telefon:</strong> +36 30 123 4567</p>
            <p><strong>E-mail:</strong> info@madarkert.hu</p>
          </div>

          {/* Közösségi média oszlop */}
          <div className="footer-section">
            <h3>Kövessen minket</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>

          {/* Szponzorok oszlop */}
          <div className="footer-section">
            <h3>Támogatóink</h3>
            <div className="sponsor-logos">
              <img src="/kereki_logo.png" alt="Szponzor 1" />
              <img src="/minizoo_logo.gif" alt="Szponzor 2" />
              <img src="/szallas_logo.png" alt="Szponzor 3" />
              <img src="/kornyeke_logo.png" alt="Szponzor 4" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Kereki Madárkert - Minden jog fenntartva</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
