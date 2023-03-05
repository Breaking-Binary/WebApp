import React from "react";
import "../styles/Login.css";

const LoginForm = () => {
	return (
		<div className="page">
			<div className="cover">
				<h1>Login</h1>
				<input type="text" placeholder="username" />
				<input type="password" placeholder="password" />
			</div>
		</div>
	);
};

export default LoginForm;
