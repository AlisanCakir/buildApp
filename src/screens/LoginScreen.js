import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import { useAPI } from "../utils/hooks";
import "./style/loginStyle.css";

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { authDispatch } = useContext(AuthContext);
	const { post } = useAPI();

	const handleLogin = (event) => {
		const data = { email: email, password: password }
		post("auth/login", data)
			.then((response) => {
				if (response?.status) {
					const userData = { ...response.data, time: Date.now() };
					authDispatch({ type: "LOGIN", payload: userData });
				}
			})
			.catch((errors) => {
				console.log(errors);
			});
		event.preventDefault();
	};


	return (
		<div className="login-form-container">
			<form className="login-form" onSubmit={handleLogin}>
				<input
					type="name"
					value={email}
					name="name"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="name"
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Giriş</button>
			</form>
		</div>
	);
};
