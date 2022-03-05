import React from "react";
import "./style.scss";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieCard = (props) => {
  const link = `/${category[props.category]}/${props.item.id}`;
  const bg = apiConfig.w500Image(
    props.item.poster_path || props.item.backdrop_path
  );
  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <FontAwesomeIcon icon="play" size="sm" />
        </Button>
      </div>
      <h3>{props.item.title || props.item.name}</h3>
    </Link>
  );
};

export default MovieCard;
