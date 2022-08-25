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
import Spinner from "../spinner/Spinner";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    let isMounted = true;
    const getList = async () => {
      isMounted && setLoading(true);

      let res = null;
      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case cate.movie:
            res = await tmdbApi.getMoviesList(movieType.popular, {
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
      isMounted && setItems(res.data.results);
      isMounted && setTotalPage(res.data.total_pages);
      isMounted && setLoading(false);

      window.scrollTo(0, 0);
    };
    getList();

    return () => (isMounted = false);
  }, [category, keyword]);

  const loadMore = async () => {
    setLoad(true);
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
    setLoad(false);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      {loading ? (
        <Spinner catalog />
      ) : (
        <>
          {!items?.length ? (
            <h2 className="no-result">Please Enter a valid Search Word</h2>
          ) : (
            <div className="movie-grid">
              {items.map((item, i) => (
                <MovieCard category={category} item={item} key={i} />
              ))}
            </div>
          )}
          {page < totalPage && !load ? (
            <div className="movie-grid__loadmore">
              <OutlineButton className="small" onClick={loadMore}>
                Load more
              </OutlineButton>
            </div>
          ) : load ? (
            <Spinner small />
          ) : null}
        </>
      )}
    </>
  );
};

export default MovieGrid;
