import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";

const CastList = ({ id }) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      isMounted && setCasts(res.data.cast.slice(0, 5));
    };
    getCredits();

    return () => (isMounted = false);
  }, [category, id]);
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
