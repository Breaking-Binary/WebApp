import React, { Component } from 'react'

export default class ForgotPassword extends Component {
  render() {
    return (
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
      </form>
    )
  }  
}
