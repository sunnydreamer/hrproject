import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/fetchUserData";
import store from "../redux/redux";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  // Code for using redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.payload); // Assuming 'data' is the part of the state updated by fetchData

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      const onboardingStatus = data.onboardingStatus;
      if (onboardingStatus === "Approved") {
        navigate("/not-found", { state: { errorTitle: "403 Not Authorized" }, replace: true })
      }
    }
  }, [data]); // Dependency on 'data' to re-run this effect when 'data' gets loaded


 

  return <div className="full-parent-height">OnboardingPage</div>;
};

export default OnboardingPage;
