import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroSlide from "../components/hero-slide/HeroSlide";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
import MovieList from "../components/movielist/MovieList";
import { category, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
  // const navigate = useNavigate();

  // const click = (e) => {
  //   navigate("/movie");
  //   window.scrollTo(0, 0);
  // };
  return (
    <div>
      <Header />
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
