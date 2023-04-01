import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // Pulls all user data from database
  useEffect(() => {
    Axios.get("http://localhost:4000/api/users").then((res) => {
      setUsers(res.data);
      console.log(res.data);
      console.log("REMOVE THE ABOVE LINE OF CODE BEFORE LAUNCH");
    });
  }, []);

  // Handles input changes in text fields
  const handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "customCheck1" ? target.checked : target.value;
    const name = target.name;

    // Checks whether to update the email field or password field
    if (name.localeCompare("password") === 0) {
      setPassword(value);
    } else {
      setEmail(value);
    }
  };

  // Handles submit button press
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      loginValidation();
    }
  };

  // Validates the login
  // Runs immediately after the GET call is made to backend
  const loginValidation = () => {
    let errors = {};
    let userIndex;
    let userPW = "";

    // Loops through all users to see if the that email exists
    for (userIndex = 0; userIndex < users.length; userIndex++) {
      if (email.localeCompare(users[userIndex].username) === 0) {
        userPW = users[userIndex].password;
        break;
      }
    }

    // Checks which action to take depending on input and previous for loop
    // 1. Email wasn't found in database
    if (userIndex === users.length) {
      errors["email"] = "No account associated with this email";
      // 2. Incorrect email password match
    } else if (userPW.localeCompare(password) !== 0) {
      console.log("WRONG - remove later");
      errors["password"] = "Incorrect Email-Password Combination";
      // 3. Correct password
    } else {
      console.log("CORRECT COMBINATION!!! -- remove later");
      navigate("/courses");
    }

    // Sends error message
    setErrors(errors);
  };

  const validate = () => {
    let emailInput = email;
    let passwordInput = password;
    let errors = {};
    let isValid = true;

    if (!emailInput) {
      isValid = false;
      errors["email"] = "Please enter your username.";
    }

    if (typeof emailInput !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(emailInput)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!passwordInput) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof passwordInput !== "undefined") {
      if (passwordInput.length < 6) {
        isValid = false;
        errors["password"] = "Please add at least 6 charachter.";
      }
    }

    setErrors(errors);

    return isValid;
  };

  return (
    <div className="App">
      <LoginNavBar />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-danger">{errors.email}</div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-danger">{errors.password}</div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/forgot-password">Forgot password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
