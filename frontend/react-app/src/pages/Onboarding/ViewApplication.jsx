import React, { useEffect, useState } from "react";

const ViewApplication = ({ userInfo }) => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/onboarding/fetchContacts`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ contactIdList: userInfo.emergencyContact }),
        }
      );
      const result = await response.json();
      setEmergencyContacts(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>View Application</h2>
      <img src={userInfo.profilePicture} />
      <p>First Name: {userInfo.firstName}</p>
      <p>Last Name: {userInfo.lastName}</p>
      {userInfo.middleName ? <p>Middle Name: {userInfo.middleName}</p> : null}
      {userInfo.preferredName ? (
        <p>Preferred Name: {userInfo.preferredName}</p>
      ) : null}
      <p>Current Address: </p>
      <p>
        {userInfo.address.street}
        {userInfo.address.streetLine2 ? (
          <>, {userInfo.address.streetLine2}</>
        ) : null}
      </p>
      <p>
        {userInfo.address.city}, {userInfo.address.state} {userInfo.address.zip}
      </p>
      <p>Phone(cell): {userInfo.phone.cell}</p>
      {userInfo.phone.work ? <p>Phone(work): {userInfo.phone.work}</p> : null}
      <p>Date of Birth: {userInfo.dob.split(`T`)[0]}</p>
      <p>Gender: {userInfo.gender}</p>
      <p>Work Authorization: {userInfo.workAuthorization}</p>
      {userInfo.workAuthorizationStart ? (
        <>
          <p>Start Date: {userInfo.workAuthorizationStart}</p>
          <p>End Date: {userInfo.workAuthorizationEnd}</p>
        </>
      ) : null}
      {userInfo.hasDriversLicense ? (
        <>
          <p>Driver's License: </p>
          <p>Number: {userInfo.driversLicense.licenseNumber}</p>
          <p>Expiration Date: {userInfo.driversLicense.expirationDate}</p>
        </>
      ) : null}
      {userInfo.reference.firstName ? (
        <>
          <p>Reference: </p>
          <p>
            Name: {userInfo.reference.firstName}
            {userInfo.reference.middleName ? (
              <> {userInfo.reference.middleName}</>
            ) : null}{" "}
            {userInfo.reference.lastName}
          </p>
          {userInfo.reference.preferredName ? (
            <p>Preferred Name: {userInfo.reference.preferredName}</p>
          ) : null}
          <p>Phone: {userInfo.reference.phone}</p>
          <p>Email: {userInfo.reference.email}</p>
          <p>Relationship: {userInfo.reference.relationship}</p>
        </>
      ) : null}
      <p>Emergency Contacts: </p>
      {emergencyContacts.map((contact) => (
        <div key={contact._id}>
          <p>{emergencyContacts.indexOf(contact) + 1}</p>
          <p>
            Name: {contact.firstName}
            {contact.middleName ? <> {contact.middleName}</> : null}{" "}
            {contact.lastName}
          </p>
          <p>Phone(cell): {contact.phone.cell}</p>
          {contact.phone.work ? (
            <p>Phone(work): {contact.phone.work}</p>
          ) : null}

          <p>Email: {contact.email}</p>
          <p>Relationship: {contact.relationship}</p>
        </div>
      ))}
    </>
  );
};

export default ViewApplication;
