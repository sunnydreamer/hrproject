import React, { useEffect, useState } from "react";

import emailjs from "@emailjs/browser";

const HREmailPage = (props) => {
  const [errors, setErrors] = useState([]);

  const sendEmailHandler = (event) => {
    event.preventDefault();

    let regLinkToken;
    let regToken;

    const firstName = event.target.elements.firstName.value.trim();
    const lastName = event.target.elements.lastName.value.trim();
    const email = event.target.elements.email.value.trim();

    fetch("http://localhost:3000/user/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          regLinkToken = data.regLinkToken;
          regToken = data.regToken;

          emailjs
            .send(
              "hr-contact-service",
              "template_av71w7n",
              {
                empFirstName: firstName,
                registrationLink: `http://localhost:5173/user/registration-with-token/${regLinkToken}`, // Todo: Store root url in the .env file and use it globally.
                registrationToken: regToken,
                to_email: email,
              },
              String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
            )
            .then((res) => {
              console.log("Email sent!");
              alert("Email sent!");
            })
            .catch((error) => {
              console.error("Email not sent.", error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors(["500 Internal Server Error"]);
      });
  };

  return (
    <div className="main-content centered">
      <form className="form-styles" onSubmit={sendEmailHandler}>
        <div className="form-header">
          <h1 style={{ color: "#000000" }}>Send Registration Email</h1>
        </div>
        <div className="form-group">
          <div className="field-group">
            <div className="flex-row centered">
              <label className="form-label">Employee First Name*: </label>
              <input
                className="form-input"
                name="firstName"
                type="text"
                placeholder="Enter employee's first name"
              />
            </div>
            <div className="flex-row centered">
              <label className="form-label">Employee Last Name*: </label>
              <input
                className="form-input"
                name="lastName"
                type="text"
                placeholder="Enter employee's last name"
              />
            </div>
            <div className="flex-row centered">
              <label className="form-label">Employee Email*: </label>
              <input
                className="form-input"
                name="email"
                type="text"
                placeholder="Enter employee's email"
              />
            </div>
          </div>
        </div>
        <div className="form-error">
          {errors &&
            errors.length > 0 &&
            errors.map((error, index) => (
              <p key={index}>{`Error: ${error}`}</p>
            ))}
        </div>
        <button className="form-submit-btn" type="submit">
          Send Registration Email
        </button>
      </form>
    </div>
  );
};

export default HREmailPage;
