import React, { useState } from "react";
import Driving from "./Driving";
import PersonalInfo from "./PersonalInfo";
import WorkAuth from "./WorkAuth";
import EmergencyContacts from "./EmergencyContacts";
import Referral from "./Referral";

const OnboardingForm = ({ userInfo, setUserInfo }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const changeHandler = (e) => {
    if (e.target.id.includes(`.`)) {
      const keys = e.target.id.split(`.`);
      userInfo[keys[0]][keys[1]] = e.target.value;
      setUserInfo({ ...userInfo });
      return;
    }
    if (e.target.value === `true` && e.target.id === `hasDriversLicense`) {
      userInfo[e.target.id] = true;
      setUserInfo({
        ...userInfo,
        driversLicense: {
          licenseNumber: ``,
          expirationDate: new Date().toISOString().split(`T`)[0],
          licenseImage: ``,
        },
      });
      return;
    }
    if (e.target.value === `false` && e.target.id === `hasDriversLicense`) {
      userInfo[e.target.id] = false;
      setUserInfo({ ...userInfo });
      return;
    }

    userInfo[e.target.id] = e.target.value;
    setUserInfo({ ...userInfo });
  };

  const submitFormHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/onboarding/updateUser`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ userInfo }),
        }
      );

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 onClick={() => setShowInfo(!showInfo)}>Personal Information</h2>
      {showInfo ? (
        <>
          <form>
            <br />
            <img src={userInfo.profilePicture} />
            <br />
            <PersonalInfo userInfo={userInfo} changeHandler={changeHandler} />
            <Driving
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              changeHandler={changeHandler}
            />
            <WorkAuth userInfo={userInfo} changeHandler={changeHandler} />
            <Referral userInfo={userInfo} changeHandler={changeHandler} />
          </form>

          <h2 onClick={() => setShowContact(!showContact)}>
            Emergency Contacts:{" "}
          </h2>
          {showContact ? (
            <>
              <EmergencyContacts
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            </>
          ) : null}

          <button onClick={submitFormHandler}>Submit Form</button>
        </>
      ) : null}
    </>
  );
};

export default OnboardingForm;
