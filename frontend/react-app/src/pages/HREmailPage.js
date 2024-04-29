import React, { useEffect } from "react";

import emailjs from "@emailjs/browser";

const HREmailPage = (props) => {
  const sendEmailHandler = () => {
    let regLinkToken;
    let regToken;

    fetch("http://localhost:3000/user/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        regLinkToken = data.regLinkToken;
        regToken = data.regToken;

        const email = "morisbroderick@gmail.com";
        emailjs
          .send(
            "hr-contact-service",
            "template_av71w7n",
            {
              empFirstName: "empFirstName",
              registrationLink: `http://localhost:5173/user/registration-with-token/${regLinkToken}`, // Todo: Store root url in the .env file and use it globally.
              registrationToken: regToken,
              to_email: email,
            },
            // process.env.EMAILJS_PUBLIC_KEY
            "2xsEuw9ncTehKozao" // Todo: Store this in the .env file
          )
          .then((res) => {
            console.log("Email sent!");
          })
          .catch((error) => {
            console.error("Email not sent.", error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errors: ["500 Internal Server Error"] });
      });
  };

  return (
    <div>
      <h2>Send Registration Token Email</h2>
      <button onClick={sendEmailHandler}>Send</button>
    </div>
  );
};

export default HREmailPage;
