import React, { useEffect, useState } from "react";
import OnboardingForm from "./Onboarding/OnboardingForm";

const OnboardingPage = () => {
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/user/getUser`);
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
