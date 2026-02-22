import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

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
        <p>© 2026 Kereki Madárkert - Minden jog fenntartva</p>
      </footer>
    </div>
  );
}

export default Layout;
