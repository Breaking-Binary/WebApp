import React, {Component} from 'react'
import 'bootstrap'
import LoginNavBar from "./LoginNavBar";

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="App">
                <LoginNavBar/>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form>
                            <h3>Forgot Password</h3>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
