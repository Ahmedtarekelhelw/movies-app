import React from "react";
import "./style.scss";

const Spinner = ({ catalog, small }) => {
  return (
    <div
      className={
        catalog ? "spinner catalog" : small ? "spinner small" : "spinner"
      }
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Spinner;
