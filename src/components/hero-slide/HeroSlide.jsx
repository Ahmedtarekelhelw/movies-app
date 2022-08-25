import { useState, useEffect } from "react";

import HeroSlideItem from "../hero-slide-item/HeroSlideItem";

import TrailerModal from "../trailermodal/TrailerModal";

import "./style.scss";

const HeroSlide = ({ movieItems }) => {
  const [slider, setSlider] = useState(0);

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
        {movieItems?.map((item, index) => (
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
