import React from "react";

const PersonalInfo = ({ userInfo, setUserInfo, changeHandler }) => {
  const uploadPFP = (e) => {
    const pfp = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const img = reader.result;

      await setUserInfo({ ...userInfo, profilePicture: img });
    };

    reader.readAsDataURL(pfp);
  };

  return (
    <div className="onboardingSectionContainer">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={userInfo.profilePicture} />
        <input type="file" id="profilePicture" onChange={uploadPFP} />
      </div>
      <div className="line">
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          value={userInfo.firstName}
          onChange={changeHandler}
          required
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          id="lastName"
          value={userInfo.lastName}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="line">
        <label htmlFor="middleName">Middle Name: </label>
        <input
          type="text"
          id="middleName"
          value={userInfo.middleName ? userInfo.middleName : ``}
          onChange={changeHandler}
        />

        <label htmlFor="preferredName">Preferred Name: </label>
        <input
          type="text"
          id="preferredName"
          value={userInfo.preferredName ? userInfo.preferredName : ``}
          onChange={changeHandler}
        />
      </div>

      <div className="line">

        <label htmlFor="phone.cell">Phone Number (cell): </label>
        <input
          type="text"
          id="phone.cell"
          value={userInfo.phone.cell}
          onChange={changeHandler}
          required
        />
        <label htmlFor="phone.work">Phone Number (work): </label>
        <input
          type="text"
          id="phone.work"
          value={userInfo.phone.work}
          onChange={changeHandler}
        />
      </div>
      <div className="line">
        <label htmlFor="address.street">Street: </label>
        <input
          type="text"
          id="address.street"
          value={userInfo.address.street}
          onChange={changeHandler}
          required
        />
        <label htmlFor="address.streetLine2">Street 2: </label>
        <input
          type="text"
          id="address.streetLine2"
          value={userInfo.address.streetLine2 ? userInfo.address.streetLine2 : ``}
          onChange={changeHandler}
        />
      </div>
      <div className="line">
        <label htmlFor="address.city">City: </label>
        <input
          type="text"
          id="address.city"
          value={userInfo.address.city}
          onChange={changeHandler}
          required
        />
        <br />
        <label htmlFor="address.state">State: </label>
        <input
          type="text"
          id="address.state"
          value={userInfo.address.state}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="line">
        <label htmlFor="address.zip">Zip: </label>
        <input
          type="text"
          id="address.zip"
          value={userInfo.address.zip}
          onChange={changeHandler}
          required
        />
        <label htmlFor="ssn">SSN: </label>
        <input
          type="password"
          id="ssn"
          value={userInfo.ssn}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="line">
        <label htmlFor="dob">DOB: </label>
        <input
          type="Date"
          id="dob"
          value={userInfo.dob ? new Date(userInfo.dob).toISOString().split('T')[0] : ''}
          onChange={changeHandler}
          required
        />
        <label htmlFor="gender">Gender: </label>
        <select id="gender" value={userInfo.gender} onChange={changeHandler}>
          <option value={`male`}>Male</option>
          <option value={`female`}>Female</option>
          <option value={`n/a`}>N/A</option>
        </select>
        <br />
      </div>
    </div>
  );
};

export default PersonalInfo;
