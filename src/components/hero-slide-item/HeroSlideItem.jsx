import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";

import "./style.scss";

const HeroSlideItem = ({ item, className }) => {
  let navigate = useNavigate();

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos?.data?.results?.length > 0) {
      const videSrc =
        "https://www.youtube.com/embed/" + videos?.data.results[0]?.key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`slide-item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container">
        <div className="info">
          <h2 className="title">{item.title}</h2>
          <p className="overview">{item.overview}</p>
          <div className="btns">
            <Button onClick={() => navigate("/movies-app/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
