import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { validationResult } from "express-validator";

const RegisterWithTokenPage = () => {
  const { regLinkToken } = useParams();
  const navigate = useNavigate();
  // console.log(regLinkToken);
  const [errors, setErrors] = useState([]);

  const registerWithTokenSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.elements);
    const regToken = event.target.elements.regToken.value;

    fetch(`http://localhost:3000/user/registration-with-token/abc123`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regLinkToken: regLinkToken,
        regToken: regToken,
      }),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.errors) {
          setErrors(data.errors);
          // console.log(errors);
        } else {
          // redirect to the next page
          navigate("/user/registration", {
            state: { email: data.email, regLinkToken, regToken },
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(500).json({ errors: ["500 Internal Server Error"] });
      });
  };

  return (
    <div className="main-content centered">
      <form onSubmit={registerWithTokenSubmitHandler}>
        <div className="form-header">
          {/*<h2>{`Hi, ${"firstName"}!`}</h2>*/}
          <h2>
            Please submit your registration token below to get
            started.
          </h2>
        </div>
        <div className="form-group">
          <div className="field-group">
            <div className="flex-row centered">
              <label>Registration Token: </label>
              <input
                name="regToken"
                type="text"
                placeholder="Registration Token"
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterWithTokenPage;
