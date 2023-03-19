import React from "react";
import {Link} from "react-router-dom";

function LoginNavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/log-in'}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/sign-up'}>
                                Sign up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/forgot-password'}>
                                Forgot Password
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default LoginNavBar;
