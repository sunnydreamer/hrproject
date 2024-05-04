import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/fetchUserData";
import store from "../redux/redux";
import OnboardingForm from "./Onboarding/OnboardingForm";
import ViewApplication from "./Onboarding/ViewApplication";

const OnboardingPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.payload);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setUserInfo(data)
    }
  }, [data]);

  useEffect(() => {
    if (userInfo.onboardingStatus === "Approved") {
      navigate("/user");
    }
  }, [navigate, userInfo]);


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
