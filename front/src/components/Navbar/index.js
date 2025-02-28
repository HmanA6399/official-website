import React, { useState, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

import logo from "../../assests/logo.png";

import routes from "../../globals/routes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export default () => {
  const [scroll, setScroll] = useState(0);

  const [opened, setOpened] = useState(false);
  useEffect(() => {
    // check the scroll to add class to the navbar
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });

    // hide the menu when click the body
    document.body.addEventListener("click", e => {
      setOpened(false);
    });
  });

  // close the menu
  const closeMenu = e => {
    e.stopPropagation();

    setOpened(false);
  };

  return (
    <nav
      data-testid="navbar"
      className={`navbar fixed-top navbar-expand-sm ${scroll ? "bg-dark" : ""}`}
    >
      <div className="container">
        <Link className={`navbar-brand ${scroll ? "img-scrolled" : ""}`} to="/">
          <img
            className="logo-img"
            src={logo}
            alt="Energia's Logo"
            title="logo of the team"
          />
        </Link>
        <button
          className="navbar-toggler"
          data-testid="toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpened(true)}
        >
          <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
        </button>
        <div
          data-testid="side-menu"
          style={{ right: opened ? "0" : "-90%" }}
          className="navbar-collapse"
          id="navbarNav"
          // to prevent the closing action when clicking anywhere on the menu
          onClick={() => setOpened(true)}
        >
          <button
            className="menu-close"
            data-testid="closer"
            onClick={e => closeMenu(e)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul
            className="navbar-nav ml-auto"
            // to prevent the closing action when clicking anywhere on the menu
            onClick={e => closeMenu(e)}
            data-testid="menu-list"
          >
            {routes &&
              routes.length > 0 &&
              routes.map(route => {
                return route.inNavbar.shown ? (
                  <li key={route.path} className="nav-item">
                    <NavLink
                      exact
                      data-testid="navlinks"
                      className="nav-link"
                      to={route.path}
                    >
                      {route.inNavbar.label}
                    </NavLink>
                  </li>
                ) : null;
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
