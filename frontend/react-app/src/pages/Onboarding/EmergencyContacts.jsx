import React, { useEffect, useState } from "react";

const EmergencyContacts = ({ userInfo, setUserInfo }) => {
  const [emergencyContacts, setEmergencyContacts] = useState(
    userInfo.emergencyContact
  );

  const [eContactList, setEContactList] = useState([]);

  useEffect(() => {
    setUserInfo({ ...userInfo, emergencyContact: emergencyContacts });
    fetchEmergencyContacts(emergencyContacts);
  }, [emergencyContacts]);

  const emergencyContactSubmitHandler = (e) => {
    e.preventDefault();
    const newEmergencyContact = {
      firstName: e.target.elements[`e.firstName`].value,
      lastName: e.target.elements[`e.lastName`].value,
      middleName: e.target.elements[`e.middleName`].value,
      phone: {
        cell: e.target.elements[`e.phone.cell`].value,
        work: e.target.elements[`e.phone.work`].value,
      },
      email: e.target.elements[`e.email`].value,
      relationship: e.target.elements[`e.relationship`].value,
    };

    addEmergencyContact(newEmergencyContact);
  };

  const addEmergencyContact = async (newContact) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/onboarding/eContact`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ newContact }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (result._id) {
        setEmergencyContacts([...emergencyContacts, result._id]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmergencyContacts = async (contactIdList) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/onboarding/fetchContacts`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ contactIdList }),
        }
      );
      const result = await response.json();
      setEContactList(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {eContactList.length === 0 ? (
        <form onSubmit={emergencyContactSubmitHandler}>
          <label htmlFor="e.firstName">First Name: </label>
          <input type="text" id="e.firstName" required />
          <br />
          <label htmlFor="e.lastName">Last Name: </label>
          <input type="text" id="e.lastName" required />
          <br />
          <label htmlFor="e.middleName">Middle Name: </label>
          <input type="text" id="e.middleName" required />
          <br />
          <label htmlFor="e.phone.cell">Phone (cell): </label>
          <input type="text" id="e.phone.cell" required />
          <br />
          <label htmlFor="e.phone.work">Phone (work): </label>
          <input type="text" id="e.phone.work" />
          <br />
          <label htmlFor="e.email">Email: </label>
          <input type="email" id="e.email" required />
          <br />
          <label htmlFor="e.relationship">Relationship: </label>
          <input type="text" id="e.relationship" required />
          <br />
          <button>Add emergency contact</button>
        </form>
      ) : (
        <form onSubmit={emergencyContactSubmitHandler}>
          <label htmlFor="e.firstName">First Name: </label>
          <input type="text" id="e.firstName" />
          <br />
          <label htmlFor="e.lastName">Last Name: </label>
          <input type="text" id="e.lastName" />
          <br />
          <label htmlFor="e.middleName">Middle Name: </label>
          <input type="text" id="e.middleName" />
          <br />
          <label htmlFor="e.phone.cell">Phone (cell): </label>
          <input type="text" id="e.phone.cell" />
          <br />
          <label htmlFor="e.phone.work">Phone (work): </label>
          <input type="text" id="e.phone.work" />
          <br />
          <label htmlFor="e.email">Email: </label>
          <input type="email" id="e.email" />
          <br />
          <label htmlFor="e.relationship">Relationship: </label>
          <input type="text" id="e.relationship" />
          <br />
          <button>Add emergency contact</button>
        </form>
      )}

      {eContactLis.length > 0 && eContactList.map((contact) => (
        <div key={contact._id}>
          <p>{emergencyContacts.indexOf(contact) + 1}</p>
          <p>
            Name: {contact.firstName}
            {contact.middleName ? <> {contact.middleName}</> : null}{" "}
            {contact.lastName}
          </p>
          <p>Phone(cell): {contact.phone.cell}</p>
          {contact.phone.work ? <p>Phone(work): {contact.phone.work}</p> : null}

          <p>Email: {contact.email}</p>
          <p>Relationship: {contact.relationship}</p>
        </div>
      ))}
    </>
  );
};

export default EmergencyContacts;
