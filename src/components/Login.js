import React, { Component } from "react";
import {} from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      users: [],
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.type === "customCheck1" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.getUsers();
    }
  }

  loginValidation() {
    let errors = {};
    console.log(this.state.users);

    let userIndex;
    let userPW = "";

    for (userIndex = 0; userIndex < this.state.users.length; userIndex++) {
      if (
        this.state.email.localeCompare(this.state.users[userIndex].username) ===
        0
      ) {
        userPW = this.state.users[userIndex].password;
        break;
      }
    }

    console.log(userIndex);
    console.log(this.state.users.length);

    if (userIndex === this.state.users.length) {
      errors["email"] = "No account associated with this email";
    } else if (userPW.localeCompare(this.state.password) !== 0) {
      console.log("WRONG");
      errors["password"] = "Incorrect Email-Password Combination";
    } else {
      console.log("CORRECT COMBINATION!!!");
      // REQUIRES NAVIGATION TO NEW PAGE
    }

    // Sends error message
    this.setState({
      errors: errors,
    });
  }

  getUsers() {
    Axios.get("http://localhost:4000/api/users").then((res) => {
      this.setState({ users: res.data }, this.loginValidation);
    });
  }

  validate() {
    let emailInput = this.state.email;
    let passwordInput = this.state.password;
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

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div className="App">
        <LoginNavBar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="text-danger">{this.state.errors.email}</div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="text-danger">{this.state.errors.password}</div>
              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-grid">
                <button
                  onClick={(e) => this.handleSubmit(e)}
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
}
