import { useState, useEffect, useRef } from "react";

import tmdbApi, { movieType } from "../../api/tmdbApi";

import HeroSlideItem from "../hero-slide-item/HeroSlideItem";

import TrailerModal from "../trailermodal/TrailerModal";

import "./style.scss";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [slider, setSlider] = useState(0);

  useEffect(() => {
    const getMovie = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(res.data.results.slice(1, 6));
        window.scrollTo(0, 0);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlider(slider >= 4 ? 0 : slider + 1);
    }, 8000);

    return () => {
      clearInterval(timer);
    };
  }, [slider]);

  return (
    <div className="hero-slide">
      <div
        className="swiper-container"
        style={{ transform: `translateX(-${slider * 100}vw)` }}
      >
        {movieItems.map((item, index) => (
          <div className="swiper-slide" key={index}>
            <HeroSlideItem
              item={item}
              className={index === slider ? "active" : ""}
            />
          </div>
        ))}
      </div>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

export default HeroSlide;
