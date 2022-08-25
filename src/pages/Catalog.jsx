import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useParams } from "react-router-dom";
import { category as cate } from "../api/tmdbApi";
import bg from "../assets/footer-bg.jpg";
import "./catalog.scss";
import MovieGrid from "../components/moviegrid/MovieGrid";

const Catalog = () => {
  const { category } = useParams();
  return (
    <div>
      <Header />
      <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
        <h2>{category === cate.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
