import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroSlide from "../components/hero-slide/HeroSlide";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
import MovieList from "../components/movielist/MovieList";
import tmdbApi, { category, movieType, tvType } from "../api/tmdbApi";
import Spinner from "../components/spinner/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getMovie = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        isMounted && setMovieItems(res.data.results.slice(1, 6));
        isMounted && setLoading(false);

        window.scrollTo(0, 0);
      } catch (err) {
        console.log(err);
      }
    };
    isMounted && getMovie();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <HeroSlide setLoading={setLoading} movieItems={movieItems} />
          <div className="container">
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Trending Movies</h2>
                <Link to="/movies-app/movie">
                  <OutlineButton className="small">View more</OutlineButton>
                </Link>
              </div>
              <MovieList category={category.movie} type={movieType.popular} />
            </div>

            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Top Rated Movies</h2>
                <Link to="/movies-app/movie">
                  <OutlineButton className="small">View more</OutlineButton>
                </Link>
              </div>
              <MovieList category={category.movie} type={movieType.top_rated} />
            </div>

            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Trending TV</h2>
                <Link to="/movies-app/tv">
                  <OutlineButton className="small">View more</OutlineButton>
                </Link>
              </div>
              <MovieList category={category.tv} type={tvType.popular} />
            </div>

            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Top Rated TV</h2>
                <Link to="/movies-app/tv">
                  <OutlineButton className="small">View more</OutlineButton>
                </Link>
              </div>
              <MovieList category={category.tv} type={tvType.top_rated} />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
