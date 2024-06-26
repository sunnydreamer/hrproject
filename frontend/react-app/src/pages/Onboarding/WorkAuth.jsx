import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const WorkAuth = ({ userInfo, setUserInfo, changeHandler, file, setFile }) => {
  const [extraOptions, setExtraOptions] = useState(false);
  const [otherOption, setOtherOption] = useState(false);
  const [isF1, setIsF1] = useState(false);
  const [workAuthValue, setWorkAuthValue] = useState(``);

  const workAuthChange = (e) => {
    if (e.target.value === `citizen` || e.target.value === `green card`) {
      setExtraOptions(false);
      setOtherOption(false);
      setIsF1(false);
      setWorkAuthValue(e.target.value);
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
      setWorkAuthValue(e.target.value);
      return;
    }
    if (e.target.value === `other`) {
      setOtherOption(true);
      setIsF1(false);
      e.target.value = `other`;
    }

    if (e.target.value === `F1`) {
      setIsF1(true);
    }

    changeHandler(e);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
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
      <div className="line">
        <label htmlFor="workAuthorization">
          Are you a citizen or a permanent resident of the U.S.?
        </label>
        <select
          id="workAuthorization"
          value={workAuthValue}
          onChange={workAuthChange}
        >
          <option></option>
          <option value={"citizen"}>Citizen</option>
          <option value={"green card"}>Green Card</option>
          <option value={"no"}>No</option>
        </select>
      </div>
      {extraOptions ? (
        <>
          <div className="line">
            <label htmlFor="workAuthorization">
              What is your work authorization?{" "}
            </label>
            <select
              id="workAuthorization"
              value={userInfo.workAuthorization}
              onChange={workAuthChange}
              required
            >
              <option></option>
              <option value={"H1-B"}>H1-B</option>
              <option value={"L2"}>L2</option>
              <option value={"F1"}>F1</option>
              <option value={"other"}>other</option>
            </select>
          </div>
          <label htmlFor="workAuthorizationStart">Start Date: </label>
          <input
            type="Date"
            id="workAuthorizationStart"
            value={userInfo.workAuthorizationStart}
            onChange={changeHandler}
            required
          />
          <br />
          <label htmlFor="workAuthorizationEnd">End Date: </label>
          <input
            type="Date"
            id="workAuthorizationEnd"
            value={userInfo.workAuthorizationEnd}
            onChange={changeHandler}
            required
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
            required
          />
          <br />
        </>
      ) : null}
      {isF1 ? (
        <>
          <input
            type="file"
            id="file-input"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Upload OPT receipt
            </Button>
            {file && <div>Selected file: {file.name}</div>}
          </label>
        </>
      ) : null}
    </>
  );
};

export default WorkAuth;
