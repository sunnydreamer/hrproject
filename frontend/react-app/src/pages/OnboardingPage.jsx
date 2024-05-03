import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "../redux/fetchUserData";
// import store from "../redux/redux";
import OnboardingForm from "./Onboarding/OnboardingForm";
import ViewApplication from "./Onboarding/ViewApplication";

const OnboardingPage = () => {
  // // Code for using redux
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.payload); // Assuming 'data' is the part of the state updated by fetchData

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("store.getState()", store.getState()); // You can get data two ways
  //   console.log("data", data);
  // }, [data]); // Dependency on 'data' to re-run this effect when 'data' gets loaded

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userInfo.onboardingStatus === "Approved") {
      navigate("/not-found", {
        state: { errorTitle: "403 Not Authorized" },
        replace: true,
      });
    }
  }, [userInfo]);

  const fetchUser = async () => {
    const response = await fetch(
      `http://localhost:3000/user/onboarding/getUser`
    );
    const result = await response.json();
    setUserInfo(result);
  };

  if (!userInfo.firstName) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="full-parent-height">
        {userInfo.onboardingStatus === `Pending` ? (
          <ViewApplication userInfo={userInfo} />
        ) : (
          <OnboardingForm userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </div>
    </>
  );
};

export default OnboardingPage;
