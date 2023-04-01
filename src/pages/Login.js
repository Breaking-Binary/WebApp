import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginNavBar from "../components/LoginNavBar";
import Axios from "axios";
import userID from "../hooks/UserID";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    // Pulls all user data from database
    useEffect(() => {
        Axios.get("http://localhost:4000/api/users").then((res) => {
            setUsers(res.data);
        });
    }, []);

    // Handles input changes in text fields
    const handleChange = (event) => {
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
        event.preventDefault()
        loginValidation();
    };

    // Validates the login
    // Runs immediately after the GET call is made to backend
    const loginValidation = () => {
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
            console.log("WRONG - remove later");
            // 2. Incorrect email password match
        } else if (userPW.localeCompare(password) !== 0) {
            console.log("WRONG - remove later");
            // 3. Correct password
        } else {
            console.log("CORRECT COMBINATION!!! -- remove later");
            userID.data = users[userIndex]._id
            navigate("/courses");
        }
    };

    function validateFormInputs() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    }

    return (
        <div className="App">
            <LoginNavBar/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div className="container-lg mt-3">
                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                            <h3>Log In</h3>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="email"
                                       name="email"
                                       id="loginEmail"
                                       placeholder="Enter email"
                                       value={email}
                                       pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+"
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="loginEmail">Email</label>
                                <div className="invalid-feedback">Not a valid email.</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="password"
                                       name="password"
                                       id="loginPassword"
                                       placeholder="Enter password"
                                       value={password}
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="loginPassword">Password</label>
                                <div className="invalid-feedback">Please enter a password.</div>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           value=""
                                           id="loginRememberMe"
                                           onChange={handleChange}
                                           formNoValidate="formNoValidate"/>
                                    <label className="form-check-label" htmlFor="loginRememberMe">Remember me</label>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary"
                                        type="submit"
                                        onClick={validateFormInputs}>
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
        </div>
    );
}
