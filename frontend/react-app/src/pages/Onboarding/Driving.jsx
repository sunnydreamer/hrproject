<<<<<<< HEAD
import React, { useState } from "react";
=======
import { useState } from "react";
>>>>>>> 203f3140789bcad1742dc10e0f8acb0d55812b37

const Driving = ({ userInfo, setUserInfo, changeHandler }) => {
  const [ownCar, setOwnCar] = useState(false);
  const ownCarHandler = (e) => {
    if (e.target.value === `true`) {
      setOwnCar(true);
      setUserInfo({ ...userInfo, carInfo: { make: ``, model: ``, color: `` } });
    }
    if (e.target.value === `false`) setOwnCar(false);
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
    <>
      <label htmlFor="hasDriversLicense">Do you have a driver's license?</label>
      <select
        id="hasDriversLicense"
        value={userInfo.hasDriversLicense}
        onChange={changeHandler}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <br />
      {userInfo.hasDriversLicense ? (
        <>
<<<<<<< HEAD
          <label htmlFor="driversLicense.licenseNumber">License Number: </label>
=======
          <label htmlFor="driversLicense.licenseNumber">License Number</label>
>>>>>>> 203f3140789bcad1742dc10e0f8acb0d55812b37
          <input
            type="text"
            id="driversLicense.licenseNumber"
            value={userInfo.driversLicense.licenseNumber}
            onChange={changeHandler}
          />
          <br />
<<<<<<< HEAD
          <label htmlFor="driversLicense.expirationDate">
            Expiration Date:{" "}
          </label>
=======
          <label htmlFor="driversLicense.expirationDate">Expiration Date</label>
>>>>>>> 203f3140789bcad1742dc10e0f8acb0d55812b37
          <input
            type="date"
            id="driversLicense.expirationDate"
            value={userInfo.driversLicense.expirationDate}
            onChange={changeHandler}
          />
          <br />
<<<<<<< HEAD
          <label htmlFor="driversLicense.licenseImage">
            Upload copy of license:{" "}
          </label>
          <input
            type="file"
            id="driversLicense.licenseImage"
            onChange={uploadDriversLicense}
=======
          {/* How to upload image */}
          <label htmlFor="driversLicense.licenseImage">Upload copy of license: </label>
          <input
            type="text"
            id="driversLicense.licenseImage"
            value={userInfo.driversLicense.licenseImage}
            onChange={changeHandler}
>>>>>>> 203f3140789bcad1742dc10e0f8acb0d55812b37
          />
          <br />
          <label htmlFor="ownCar">Do you own a car? </label>
          <select id="ownCar" value={ownCar} onChange={ownCarHandler}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />
          {ownCar ? (
            <>
              <label htmlFor="carInfo.make">Make: </label>
              <input
                type="text"
                id="carInfo.make"
                value={userInfo.carInfo.make}
                onChange={changeHandler}
              />
              <br />
              <label htmlFor="carInfo.model">Model: </label>
              <input
                type="text"
                id="carInfo.model"
                value={userInfo.carInfo.model}
                onChange={changeHandler}
              />
              <br />
              <label htmlFor="carInfo.color">Color: </label>
              <input
                type="text"
                id="carInfo.color"
                value={userInfo.carInfo.color}
                onChange={changeHandler}
              />
              <br />
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Driving;
