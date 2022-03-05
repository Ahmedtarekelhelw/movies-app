import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../moviecard/MovieCard";
import "./style.scss";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
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
      setItems(res.data.results);
    };

    getItems();
  }, []);

  const [mx, setMx] = useState(0);

  const xRef = useRef(0);
  const oldRef = useRef(0);

  const onMouseDown = (e) => {
    xRef.current = e.clientX;
    oldRef.current = mx;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const diff = xRef.current - e.clientX;
    const New = oldRef.current - diff;
    setMx(New);
  };

  return (
    <div className="movie-list">
      <div
        className="container-slide"
        onMouseDown={onMouseDown}
        style={{ transform: `translatex(${mx}px)` }}
      >
        {items.map((item, i) => (
          <div className="wrapper" key={i}>
            <MovieCard item={item} category={props.category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
