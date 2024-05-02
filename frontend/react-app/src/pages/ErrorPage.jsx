import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ErrorPage = (props) => {
  const location = useLocation();

  let errorTitle;
  if (location.state) {
    errorTitle = location.state.errorTitle;
  } else {
    errorTitle = "404 Not Found";
  }

  return (
    <div className="full-parent-height">
      <div className="main-content">
        <div className="flex-col centered full-parent-width">
          <h1 style={{color: "#000"}}>{errorTitle}</h1>
          <h2>If you are an approved authorized user, please <Link to={"user/login"}>Login</Link></h2>
          <h2>Please contact your HR if you think this is a mistake.</h2>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
