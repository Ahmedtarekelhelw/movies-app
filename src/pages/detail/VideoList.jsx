import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

const VideoList = ({ id }) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, id);
      isMounted && setVideos(res.data.results.slice(0, 5));
    };
    getVideos();

    return () => (isMounted = false);
  }, [category, id]);
  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = ({ item }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
