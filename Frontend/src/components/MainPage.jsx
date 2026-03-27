import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import "./Layout.css"

const MainPage = () => {
  return (
    <div className="main-wrapper">
      <img
        src="/madarpark_header.png"
        alt="Balatoni Madárkert"
        className="header-img"
      />

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

      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>

      <div className="description-banner">
        <p>
          A Balaton partjától karnyújtásnyira, Kőröshegy és Kereki határában várja Önt egy különleges világ, ahol a természet az úr.
          Madárkertünk nem csupán egy bemutatóhely, hanem egy családias hangulatú zöld menedék, ahol a fák hűvösében, madárdal mellett pihenhet meg a rohanó hétköznapokból.
        </p>
      </div>

      <div className="content-row">
        <div className="image-placeholder">
          <img src="/Madarpark_1.jpg" alt="Színes papagájok" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Parkunkban a világ legszebb madaraival találkozhat: az <strong>egzotikus, beszélő papagájoktól</strong> kezdve a ritka díszmadarakon át egészen a méltóságteljes ragadozókig.
            Lakóink nagy részét kézből neveltük, így látogatóinknak egyedülálló élményben lehet részük.
          </p>
        </div>
      </div>

      <div className="content-row reverse">
        <div className="image-placeholder">
          <img src="/Madarpark_2.jpg" alt="Oktatás és felfedezés" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Hisszük, hogy a természet védelme a megismeréssel kezdődik.
            Ezért Madárkertünkben nagy hangsúlyt fektetünk az <strong>ismeretterjesztésre</strong>: modern, QR-kódos rendszerünk segítségével bárki azonnal érdekességeket tudhat meg a madarak életmódjáról.
          </p>
        </div>
      </div>

      <div className="content-row">
        <div className="image-placeholder">
          <img src="/Madarpark_3.jpg" alt="Családi kirándulás" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Legyen szó egy izgalmas hétvégi programról a gyerekekkel, vagy egy csendes sétáról a természet kedvelőinek, a <strong>Kereki Madárkert</strong> felejthetetlen emlékeket kínál.
            Jöjjön el hozzánk, és vigyen haza egy darabkát a természet harmóniájából!
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-section">
            <h3>Kapcsolat</h3>
            <p><strong>Tulajdonosok:</strong> Rácz Sándor & Rácz Sándorné</p>
            <p><strong>Telefon:</strong> +36 30 123 4567</p>
            <p><strong>E-mail:</strong> info@madarkert.hu</p>
          </div>

          <div className="footer-section">
            <h3>Kövessen minket</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>

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
        </div>
      </footer>
    </div>
  );
};

export default MainPage;