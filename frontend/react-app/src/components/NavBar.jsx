import React from "react";
import { NavLink } from "react-router-dom";

/**
 * props.navLinks: Array of objects with the following structure:
 * [{
 *   title: String,
 *   path: String
 * }]
 */

const NavBar = (props) => {

  const logoutHandler = () => {
    // For logging out
    useEffect(() => {
      fetch("http://localhost:3000/user/logout", {
        method: "GET",
        credentials: "include",
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
  };

  return (
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
            Personal Information
          </NavLink>
          <NavLink to="/user/summary" className="nav-link">
            Summary
          </NavLink>
          <NavLink to="/user/visa-status" className="nav-link">
            Visa Status
          </NavLink>
          <NavLink to="/user/housing" className="nav-link">
            Housing
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;
