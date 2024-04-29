import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

/**
 * props.navLinks: Array of objects with the following structure:
 * [{
 *   title: String,
 *   path: String
 * }]
 */

const Page = (props) => {
  // console.log(props.navLinks);
  if (props.navLinks && props.navLinks.length === 0) {
    return (
      <div className="flex-row full-view-height">
        <div className="flex-col full-parent-width">
          <Header title={props.title} />
          {props.children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex-row full-view-height">
        <NavBar navLinks={props.navLinks} />
        <div className="flex-col full-parent-width">
          <Header title={props.title} />
          {props.children}
        </div>
      </div>
    );
  }
};

export default Page;
