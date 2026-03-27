import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const Layout = ({ children }) => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="main-wrapper">
      <img src="/madarpark_header.png" alt="Header" className="header-img" />

      <nav className="header-banner-nav">
              <ul className="nav-links">
                <li>
                  <Link to="/">
                    <img src="/logo.png" alt="Logo" className="logo" />
                  </Link>
                </li>
                <li><Link to="/Animals">Tenyészetünk</Link></li>
                <li><Link to="/ForSalePage">Eladó példányaink</Link></li>
                <li><Link to="/Rules">Házirend</Link></li>
                <li><Link to="/PriceOpening">Árak és nyitvatartás</Link></li>
                <li><a href="/Login">Admin</a></li>
              </ul>
            </nav>

      <main className="main-content">{children}</main>

    </div>
  );
};

export default Layout;