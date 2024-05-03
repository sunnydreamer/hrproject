import React, { useState } from "react";

const WorkAuth = ({ userInfo, setUserInfo, changeHandler }) => {
  const [extraOptions, setExtraOptions] = useState(false);
  const [otherOption, setOtherOption] = useState(false);
  const [isF1, setIsF1] = useState(false);

  const citiGreenChange = (e) => {
    if (e.target.value === `citizen` || e.target.value === `green card`) {
      setExtraOptions(false);
      setOtherOption(false);
      setIsF1(false);
      setUserInfo({
        ...userInfo,
        workAuthorizationStart: null,
        workAuthorizationEnd: null,
      });
    }
    if (e.target.value === `no`) {
      setOtherOption(false);
      setExtraOptions(true);
      setIsF1(false);
    }
    if (e.target.value === `other`) {
      setOtherOption(true);
      setIsF1(false);
    }

    if (e.target.value === `F1`) {
      setIsF1(true);
    }

    changeHandler(e);
  };

  const uploadOptReceipt = (e) => {
    const optReceipt = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const img = reader.result;

      await setUserInfo({
        ...userInfo,
        opt: {
          receipt: {
            userId: userInfo._id,
            documentType: `Receipt`,
            document: img,
            status: `Pending`,
          },
        },
      });
    };

    reader.readAsDataURL(optReceipt);
  };

  return (
    <>
      <label htmlFor="workAuthorization">
        Are you a citizen or a permanent resident of the U.S.?
      </label>
      <select
        id="workAuthorization"
        value={userInfo.workAuthorization}
        onChange={citiGreenChange}
      >
        <option></option>
        <option value={"citizen"}>Citizen</option>
        <option value={"green card"}>Green Card</option>
        <option value={"no"}>No</option>
      </select>
      <br />
      {extraOptions ? (
        <>
          <label htmlFor="workAuthorization">
            What is your work authorization?{" "}
          </label>
          <select
            id="workAuthorization"
            value={userInfo.workAuthorization}
            onChange={citiGreenChange}
          >
            <option></option>
            <option value={"H1-B"}>H1-B</option>
            <option value={"L2"}>L2</option>
            <option value={"F1"}>F1</option>
            <option value={"other"}>other</option>
          </select>
          <br />
          <label htmlFor="workAuthorizationStart">Start Date: </label>
          <input
            type="Date"
            id="workAuthorizationStart"
            value={userInfo.workAuthorizationStart}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="workAuthorizationEnd">End Date: </label>
          <input
            type="Date"
            id="workAuthorizationEnd"
            value={userInfo.workAuthorizationEnd}
            onChange={changeHandler}
          />
          <br />
        </>
      ) : null}
      {otherOption ? (
        <>
          <label htmlFor="workAuthorization">Please Specify: </label>
          <input
            type="text"
            id="workAuthorization"
            value={userInfo.workAuthorization}
            onChange={changeHandler}
          />
          <br />
        </>
      ) : null}
      {isF1 ? (
        <>
          <label htmlFor="optReceipt">Please upload OPT receipt: </label>
          <input type="file" id="optReceipt" />
          <br />
        </>
      ) : null}
    </>
  );
};

export default WorkAuth;
