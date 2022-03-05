import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../moviecard/MovieCard";
import tmdbApi, {
  category as cate,
  movieType,
  tvType,
} from "../../api/tmdbApi";

import "./style.scss";
import { OutlineButton } from "../button/Button";
import MovieSearch from "../moviesearch/MovieSearch";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let res = null;
      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case cate.movie:
            res = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });

            break;
          default:
            res = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        res = await tmdbApi.search(category, { params });
      }
      setItems(res.data.results);
      setTotalPage(res.data.total_pages);
      window.scrollTo(0, 0);
    };
    getList();
  }, [category, keyword]);

  const loadMore = async () => {
    let res = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (category) {
        case cate.movie:
          res = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          res = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      res = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...res.data.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
