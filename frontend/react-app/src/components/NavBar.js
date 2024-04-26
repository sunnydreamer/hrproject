import React from "react";
import { NavLink } from "react-router-dom";

/**
 * props.navLinks: Array of objects with the following structure:
 * [{
 *   title: String,
 *   path: String
 * }]
 */

const NavBar = (props) => (
  <div className="nav-bar flex-col">
    {props.navLinks && props.navLinks.length > 0 ? (
      props.navLinks.map((link, index) => (
        <NavLink key={index} to={link.path} className="nav-link">
          {link.title}
        </NavLink>
      ))
    ) : (
      <>
        <NavLink to="/user" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/user/login" className="nav-link">
          About
        </NavLink>
      </>
    )}
  </div>
);

export default NavBar;
