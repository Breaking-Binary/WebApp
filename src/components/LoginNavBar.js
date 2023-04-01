import React from "react";
import {Link} from "react-router-dom";

function LoginNavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
            </ul>
        </nav>
    );
}

export default LoginNavBar;
