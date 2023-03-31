import React, { useState } from "react";
import axios from "axios";
import LoginNavBar from "./LoginNavBar";

export const SignUp = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    courses: [],
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
    console.log(inputs);
    axios
      .post(`http://localhost:4000/api/users`, {
        //   .post(`${process.env.BACKEND_SERVER_URL}/api/users/`, { (THIS DOESN"T WORK FOR SOME REASON)
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        username: inputs.email,
        password: inputs.password,
        school: inputs.school,
      })
      .then((r) => {});
  };

  return (
    <div className="App">
      <LoginNavBar />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>
                First name
                <input
                  type="text"
                  name="firstname"
                  value={inputs.firstname || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Last name
                <input
                  type="text"
                  name="lastname"
                  value={inputs.lastname || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Password
                <input
                  type="text"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Confirm Password
                <input
                  type="text"
                  name="confirmPassword"
                  value={inputs.confirmPassword || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label>
                school
                <input
                  type="text"
                  name="school"
                  value={inputs.school || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered? Log in <a href="/log-in">here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
