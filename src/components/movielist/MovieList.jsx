import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../moviecard/MovieCard";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../spinner/Spinner";

// Import Swiper styles
import "swiper/css";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const getItems = async () => {
      isMounted && setLoading(true);
      let res = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            res = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            res = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        res = await tmdbApi.similar(props.category, props.id);
      }
      isMounted && setItems(res.data.results);
      isMounted && setLoading(false);
    };

    getItems();

    return () => (isMounted = false);
  }, []);

  return (
    <div className="movie-list">
      <div className="container-slide">
        {loading ? (
          <Spinner small />
        ) : (
          <Swiper spaceBetween={10} slidesPerView={"auto"}>
            {items?.map((item, i) => (
              <SwiperSlide key={i}>
                <MovieCard item={item} category={props.category} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MovieList;
