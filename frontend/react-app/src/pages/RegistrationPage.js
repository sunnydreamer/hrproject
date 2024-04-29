import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [errors, setErrors] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  // console.log(data);

  if (!data) {
    return (
      <div className="main-content flex-col centered">
        <h1 style={{color:"#000000"}}>403 Authentication Required</h1>
        <h2>
          Please contact your HR representative if you have any questions.
        </h2>
      </div>
    );
  }

  const registrationSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.elements);
    const email = event.target.elements.email.value;
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    fetch(`http://localhost:3000/user/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          navigate("/user/login");
        }
      }).catch((error) => {
        console.log(error);
        setErrors(["500 Internal Server Error"]);
      });
  }

  return (
    <div className="main-content centered">
      <form onSubmit={registrationSubmitHandler}>
        <div className="form-header">
          <h1 style={{color: "#000000"}}>
            New Employee Registration
          </h1>
        </div>
        <div className="form-group">
          <div className="field-group">
            <div className="flex-row centered">
              <label>Email*: </label>
              <input
                name="email"
                type="text"
                value={data.email}
                disabled
              />
            </div>
            <div className="flex-row centered">
              <label>Username*: </label>
              <input
                name="username"
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className="flex-row centered">
              <label>Password*: </label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div className="flex-row centered">
              <label>Confirm Password*: </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
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
}

export default RegistrationPage;
