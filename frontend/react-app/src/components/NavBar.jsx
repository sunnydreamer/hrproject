import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_STATE, resetState } from "../redux/redux";

/**
 * props.navLinks: Array of objects with the following structure:
 * [{
 *   title: String,
 *   path: String
 * }]
 */

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    // Clean up redux store
    dispatch(resetState());

    // Clean up cookie
    fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        navigate("/user/login");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <button
            onClick={logoutHandler}
            className="nav-link"
            style={{
              border: "none",
              backgroundColor: "transparent",
              padding: 0,
              textAlign: "left",
            }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default NavBar;
