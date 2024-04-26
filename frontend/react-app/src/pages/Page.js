import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

const Page = (props) => {
  console.log("Page");
  return (
    <div className="flex-row full-view-height">
      <NavBar
        // Uncomment the following line to pass navLinks as props, or use the default links
        // navLinks={[
        //   { title: "User", path: "/user" },
        //   { title: "About", path: "/about" },
        // ]}
      />
      <div className="flex-col full-parent-width">
        <Header title={props.title} />
        {props.children}
      </div>
    </div>
  );
};

export default Page;
