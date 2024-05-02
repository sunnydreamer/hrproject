import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// User click on registration link in email
// User go to registration-with-token page
// User enter registration token from email
// System check link token and registration token
// If token is invalid, show error message
// If token is valid, redirect to registration page

// User go to registration page
// User attempts to register
// User register successfully
// Redirect to login page

// User go to login page
// User attempts to login
// System check user credentials
// User login successfully
// System check onboarding status
// If onboarding status is Not Started, Rejected, or Pending, redirect to onboarding page
// If onboarding status is Approved, redirect to Personal Information page

const LoginPage = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.elements);
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          navigate(data.navigate);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors(["500 Internal Server Error"]);
      });
  };
  return (
    <div className="main-content centered">
      <form className="form-styles" onSubmit={loginSubmitHandler}>
        <div className="form-header">
          <h1 style={{ color: "#000000" }}>Employee Login</h1>
        </div>
        <div className="form-group">
          <div className="field-group">
            <div className="flex-row centered">
              <label className="form-label">Email*: </label>
              <input
                className="form-input"
                name="email"
                type="text"
                placeholder="Enter email"
              />
            </div>
            <div className="flex-row centered">
              <label className="form-label">Password*: </label>
              <input
                className="form-input"
                name="password"
                type="password"
                placeholder="Enter password"
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

export default LoginPage;
