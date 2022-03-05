import React, { useRef, useEffect } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/tmovie.png";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const scrollFun = () => {
      if (window.scrollY > 100) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", scrollFun);
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">tMovies</Link>
        </div>
        <ul className="nav">
          {headerNav.map((e, i) => (
            <li key={i}>
              <NavLink to={e.path}>{e.display}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
