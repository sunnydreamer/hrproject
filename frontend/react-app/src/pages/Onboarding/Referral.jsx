import React, { useState } from "react";

const Referral = ({ userInfo, changeHandler }) => {
  const [referral, setReferral] = useState(false);

  const changeRefer = (e) => {
    if (e.target.value === "true") setReferral(true);
    if (e.target.value === "false") setReferral(false);
  };

  return (
    <>
      <label htmlFor="hadReference">Do you have a referral?</label>
      <select id="hasReference" value={referral} onChange={changeRefer}>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <br />
      {referral ? (
        <>
          <label htmlFor="reference.firstName">First Name: </label>
          <input
            type="text"
            id="reference.firstName"
            value={userInfo.reference.firstName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.middleName">Middle Name: </label>
          <input
            type="text"
            id="reference.middleName"
            value={userInfo.reference.middleName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.lastName">Last Name: </label>
          <input
            type="text"
            id="reference.lastName"
            value={userInfo.reference.lastName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.preferredName">Preferred Name: </label>
          <input
            type="text"
            id="reference.preferredName"
            value={userInfo.reference.preferredName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.phone">Phone: </label>
          <input
            type="text"
            id="reference.phone"
            value={userInfo.reference.phone}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.email">Email: </label>
          <input
            type="text"
            id="reference.email"
            value={userInfo.reference.email}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="reference.relationship">Relationship: </label>
          <input
            type="text"
            id="reference.relationship"
            value={userInfo.reference.relationship}
            onChange={changeHandler}
          />
          <br />
        </>
      ) : null}
    </>
  );
};

export default Referral;
