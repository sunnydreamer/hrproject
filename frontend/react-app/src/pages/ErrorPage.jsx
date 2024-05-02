import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_STATE, resetState } from "../redux/redux";
import store from "../redux/redux";
// import { fetchData } from "../redux/fetchUserData";

const ErrorPage = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.payload); // Assuming 'data' is the part of the state updated by fetchData

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("store.getState()", store.getState()); // You can get data two ways
  //   console.log("data", data);
  // }, [data]); // Dependency on 'data' to re-run this effect when 'data' gets loaded

  // Clean up redux store
  dispatch(resetState());

  // console.log("store.getState()", store.getState()); // You can get data two ways

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
          <h1 style={{ color: "#000" }}>{errorTitle}</h1>
          <h2>
            If you are an authorized user, please{" "}
            <Link to={"user/login"}>Login</Link>.
          </h2>
          <h2>Please contact your HR if you think this is a mistake.</h2>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
