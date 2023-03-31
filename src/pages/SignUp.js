import React, {useState} from "react";
import axios from "axios";
import LoginNavBar from "../components/LoginNavBar";

export const SignUp = () => {
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
        axios.post(`${process.env.BACKEND_SERVER_URL}/api/users/`, {
            params: {
                // firstName,
                // lastName,
                // email,
                // password,
                // confirmPassword,
                // school,
                // courses
            }
        })
    };

    return (
        <div className="App">
            <LoginNavBar/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div className="container-lg mt-3">
                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                            <h3>Sign Up</h3>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text"
                                       name="email"
                                       id="first_name"
                                       placeholder="Enter first name"
                                       value={email}
                                       pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+"
                                       onChange={handleInputChange}
                                       required/>
                                <label className="form-label" htmlFor="first_name">First Name</label>
                                <div className="invalid-feedback">Not a valid email.</div>
                            </div>
                            <div className="mb-3">
                                <form>
                                    <label>
                                        Last name
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={inputs.lastName || ""}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
                            </div>
                            <div className="mb-3">
                                <form>
                                    <label>
                                        Email
                                        <input
                                            type="text"
                                            name="email"
                                            value={inputs.email || ""}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
                            </div>
                            <div className="mb-3">
                                <form>
                                    <label>
                                        Password
                                        <input
                                            type="text"
                                            name="password"
                                            value={inputs.password || ""}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
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
                                <form>
                                    <label>
                                        school
                                        <input
                                            type="text"
                                            name="school"
                                            value={inputs.school || ""}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
                            </div>
                            <div className="mb-3">
                                <form>
                                    <label>
                                        Courses
                                        <input
                                            type="text"
                                            name="courses"
                                            value={inputs.courses || ""}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
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
        </div>
    );
};

export default SignUp;
