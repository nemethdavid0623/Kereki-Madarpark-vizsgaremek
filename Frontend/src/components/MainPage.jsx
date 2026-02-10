import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-content">
      <img
        src="/madarpark_header.png"
        alt="Balatoni Madárkert"
        className="header-img"
      />

      <nav className="header-banner-nav">
        <ul className="nav-links">
          <Link to="http://localhost:5173/">
            <img src="/logo.png" alt="" className="logo" />
          </Link>
          <li>
            <Link to="http://localhost:5173/Animals">Tenyészetünk</Link>
          </li>
          <li>
            <a href="#">Eladó példányaink</a>
          </li>
          <li>
            <a href="#">Árak, Nyitvatartás</a>
          </li>
          <li>
            <a href="#">Házirend</a>
          </li>
          <li>
            <a href="http://localhost:5173/Login">Admin</a>
          </li>
        </ul>
      </nav>

      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>

      <div className="description-banner">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At natus aut
          reiciendis consectetur assumenda. Assumenda ducimus, magni fugiat
          ullam temporibus, facilis tempore molestiae accusantium cumque nihil,
          sint distinctio fuga quae.
        </p>
      </div>

      <div className="content-row">
        <div className="image-placeholder">kép</div>
        <div className="text-placeholder">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, ipsum
          quam. Dolorum error tempora magnam aliquid deserunt aspernatur,
          placeat sit illo temporibus. Quis maiores ea obcaecati ut. Quae, quis
          provident?
        </div>
      </div>

      <div className="content-row reverse">
        <div className="image-placeholder">kép</div>
        <div className="text-placeholder">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
          dignissimos laudantium architecto quos. Officiis odio autem modi
          placeat aliquam rerum cupiditate similique quibusdam, dolorem
          provident eligendi velit accusantium nesciunt distinctio?
        </div>
      </div>

      <div className="content-row">
        <div className="image-placeholder">kép</div>
        <div className="text-placeholder">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quo
          minima nihil repellendus rem quod voluptatibus corporis ratione
          doloribus at? Veniam nulla, magnam doloremque delectus omnis tempore
          voluptatem adipisci laboriosam!
        </div>
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default MainPage;
