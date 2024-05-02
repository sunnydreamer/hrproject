import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "../redux/fetchUserData";
// import store from "../redux/redux";
import OnboardingForm from "./Onboarding/OnboardingForm";

const OnboardingPage = () => {
  // const dispatch = useDispatch();
  // // const data = useSelector((state) => state.data);

  // console.log("in onboarding page");
  // useEffect(() => {
  //   console.log("dispatch(fetchData)");
  //   dispatch(fetchData());
  // }, [dispatch]);
  // console.log("after fetching");
  // // console.log("data", data);
  // console.log("store.getState()", store.getState());

  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.payload); // Assuming 'data' is the part of the state updated by fetchData

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("store.getState()", store.getState()); // You can get data two ways
  //   console.log("data", data);
  // }, [data]); // Dependency on 'data' to re-run this effect when 'data' gets loaded

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/user/onboarding/getUser`);
    const result = await response.json();
    setUserInfo(result);
  };

  return (
    <>
      <div className="full-parent-height">
        {userInfo.firstName ? (
          <OnboardingForm userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : null}
      </div>
    </>
  );
};

export default OnboardingPage;
