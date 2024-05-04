import React, { useState } from "react";

const Driving = ({ userInfo, setUserInfo, changeHandler }) => {
  const [ownCar, setOwnCar] = useState(false);
  const ownCarHandler = (e) => {
    if (e.target.value === `true`) {
      setOwnCar(true);
      setUserInfo({ ...userInfo, carInfo: { make: ``, model: ``, color: `` } });
    }
    if (e.target.value === `false`) { setOwnCar(false) }
  };

  const uploadDriversLicense = (e) => {
    const driversLicenseImg = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const img = reader.result;

      await setUserInfo({
        ...userInfo,
        driversLicense: { ...userInfo.driversLicense, licenseImage: img },
      });
    };

    reader.readAsDataURL(driversLicenseImg);
  };

  return (
    <div className="onboardingSectionContainer">
      <div className="line">
        <label htmlFor="hasDriversLicense">Do you have a driver's license?</label>
        <select
          id="hasDriversLicense"
          value={userInfo.hasDriversLicense}
          onChange={changeHandler}
          required
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      {userInfo.hasDriversLicense ? (
        <>
          <div className="line">
            <label htmlFor="driversLicense.licenseNumber">License Number: </label>
            <input
              type="text"
              id="driversLicense.licenseNumber"
              value={userInfo.driversLicense.licenseNumber}
              onChange={changeHandler}
              required
            />
            <label htmlFor="driversLicense.expirationDate">
              Expiration Date:{" "}
            </label>
            <input
              type="date"
              id="driversLicense.expirationDate"
              value={userInfo.driversLicense.expirationDate ? new Date(userInfo.driversLicense.expirationDate).toISOString().split('T')[0] : ''}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="line">
            <label htmlFor="driversLicense.licenseImage">
              Upload copy of license:{" "}
            </label>
            <input
              type="file"
              id="driversLicense.licenseImage"
              onChange={uploadDriversLicense}
              required
            />
          </div>
          <div className="line">
            <br />
            <label htmlFor="ownCar">Do you own a car? </label>
            <select id="ownCar" value={ownCar} onChange={ownCarHandler} required>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <br />
          </div>
          {ownCar ? (
            <>
              <div className="line">
                <label htmlFor="carInfo.make">Make: </label>
                <input
                  type="text"
                  id="carInfo.make"
                  value={userInfo.carInfo.make}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="line">
                <label htmlFor="carInfo.model">Model: </label>
                <input
                  type="text"
                  id="carInfo.model"
                  value={userInfo.carInfo.model}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="line">
                <label htmlFor="carInfo.color">Color: </label>
                <input
                  type="text"
                  id="carInfo.color"
                  value={userInfo.carInfo.color}
                  onChange={changeHandler}
                  required
                />
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Driving;
