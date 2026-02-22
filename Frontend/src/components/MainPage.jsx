import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-content">
      {/* 1. HEADER KÉP */}
      <img
        src="/madarpark_header.png"
        alt="Balatoni Madárkert"
        className="header-img"
      />

      {/* 2. NAVIGÁCIÓ */}
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

      {/* 3. ÜDVÖZLŐ SZÖVEG */}
      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>

      <div className="description-banner">
        <p>
          A Balaton partjától karnyújtásnyira, Kőröshegy és Kereki határában várja Önt egy különleges világ, ahol a természet az úr.
          Madárkertünk nem csupán egy bemutatóhely, hanem egy családias hangulatú zöld menedék, ahol a fák hűvösében, madárdal mellett pihenhet meg a rohanó hétköznapokból.
        </p>
      </div>

      {/* 4. TARTALMI BLOKKOK (CIKK-CAKK) */}

      {/* Sor 1: Kép balra - Szöveg jobbra */}
      <div className="content-row">
        <div className="image-placeholder">
          <img src="/kep1.jpg" alt="Színes papagájok" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Parkunkban a világ legszebb madaraival találkozhat: az <strong>egzotikus, beszélő papagájoktól</strong> kezdve a ritka díszmadarakon át egészen a méltóságteljes ragadozókig.
            Lakóink nagy részét kézből neveltük, így látogatóinknak egyedülálló élményben lehet részük.
          </p>
        </div>
      </div>

      {/* Sor 2: Szöveg balra - Kép jobbra (REVERSE) */}
      <div className="content-row reverse">
        <div className="image-placeholder">
          <img src="/kep2.jpg" alt="Oktatás és felfedezés" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Hisszük, hogy a természet védelme a megismeréssel kezdődik.
            Ezért Madárkertünkben nagy hangsúlyt fektetünk az <strong>ismeretterjesztésre</strong>: modern, QR-kódos rendszerünk segítségével bárki azonnal érdekességeket tudhat meg a madarak életmódjáról.
          </p>
        </div>
      </div>

      {/* Sor 3: Kép balra - Szöveg jobbra */}
      <div className="content-row">
        <div className="image-placeholder">
          <img src="/kep3.jpg" alt="Családi kirándulás" className="content-img" />
        </div>
        <div className="text-placeholder">
          <p>
            Legyen szó egy izgalmas hétvégi programról a gyerekekkel, vagy egy csendes sétáról a természet kedvelőinek, a <strong>Kereki Madárkert</strong> felejthetetlen emlékeket kínál.
            Jöjjön el hozzánk, és vigyen haza egy darabkát a természet harmóniájából!
          </p>
        </div>
      </div>

      {/* 5. FOOTER */}
      <footer className="footer">
        <p>© 2026 Kereki Madárkert - Minden jog fenntartva</p>
      </footer>
    </div>
  );
};

export default MainPage;