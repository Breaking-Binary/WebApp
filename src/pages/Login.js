import React, { useState } from "react";
import "../styles/Login.css";

const LoginForm = () => {
	const [currentUserName, setCurrentUserName] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	return (
		<div className="page">
			<div className="cover">
				<form>
					<h1>Login</h1>
					<input
						onChange={(e) => {
							setCurrentUserName(e.target.value);
						}}
						type="text"
						placeholder="username"
					/>
					<input
						onChange={(e) => {
							setCurrentPassword(e.target.value);
						}}
						type="password"
						placeholder="password"
					/>
					<div>
						<button> Login </button>
					</div>
				</form>
				{currentUserName} {currentPassword}
			</div>
		</div>
	);
};

export default LoginForm;
