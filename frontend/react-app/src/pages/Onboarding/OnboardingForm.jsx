import React, { useState, useEffect } from "react";
import Driving from "./Driving";
import PersonalInfo from "./PersonalInfo";
import WorkAuth from "./WorkAuth";
import EmergencyContacts from "./EmergencyContacts";
import Referral from "./Referral";
import Button from "@mui/material/Button";

const OnboardingForm = ({ userInfo, setUserInfo }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [file, setFile] = useState(null);

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

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userInfo._id);
      // Append JSON data to FormData
      formData.append(
        "userInfo",
        JSON.stringify({ ...userInfo, onboardingStatus: "Pending" })
      );

      const response = await fetch(
        `http://localhost:3000/user/onboarding/updateUser`,
        {
          method: `PUT`,
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2
        style={{ textAlign: "center" }}
        onClick={() => setShowInfo(!showInfo)}
      >
        Personal Information
      </h2>
      {showInfo ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form>
            <PersonalInfo
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              changeHandler={changeHandler}
            />
            <Driving
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              changeHandler={changeHandler}
            />
            <WorkAuth
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              file={file}
              setFile={setFile}
              changeHandler={changeHandler}
            />
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
          <div
            className="line"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              onClick={submitFormHandler}
            >
              {" "}
              Submit
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OnboardingForm;
