import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginNavBar from "../components/LoginNavBar";
import userID from "../hooks/UserID";

export const SignUp = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        school: "",
        courses: [],
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:4000/api/users`, {
                //   .post(`${process.env.BACKEND_SERVER_URL}/api/users/`, { (THIS DOESN"T WORK FOR SOME REASON)
                firstname: inputs.firstname,
                lastname: inputs.lastname,
                username: inputs.email,
                password: inputs.password,
                school: inputs.school,
            })
            .then((res) => {
                userID.data = res.data._id
                navigate("/courses");
            });
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
                            <h3>Sign Up</h3>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text"
                                       name="firstname"
                                       id="signupFirstname"
                                       placeholder="Enter first name"
                                       value={inputs.firstname}
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="signupFirstname">First Name</label>
                                <div className="invalid-feedback">Please enter a first name.</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text"
                                       name="lastname"
                                       id="signupLastname"
                                       placeholder="Enter last name"
                                       value={inputs.lastname}
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="signupLastname">Last Name</label>
                                <div className="invalid-feedback">Please enter a last name.</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="email"
                                       name="email"
                                       id="signupEmail"
                                       placeholder="Enter email"
                                       value={inputs.email}
                                       pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+"
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="signupLastname">Email</label>
                                <div className="invalid-feedback">Not a valid email.</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="password"
                                       name="password"
                                       id="signupPassword"
                                       placeholder="Enter password"
                                       value={inputs.password}
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="signupPassword">Password</label>
                                <div className="invalid-feedback">Please enter a password.</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text"
                                       name="school"
                                       id="signupSchool"
                                       placeholder="Enter school"
                                       value={inputs.school}
                                       onChange={handleChange}
                                       required/>
                                <label className="form-label" htmlFor="signupConfirmPassword">Enter School</label>
                                <div className="invalid-feedback">Please enter a school.</div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary"
                                        type="submit"
                                        onClick={validateFormInputs}>
                                    Register
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
