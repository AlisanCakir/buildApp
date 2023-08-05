import React, { Suspense, useReducer } from "react";
import Routes from "./Routes";
import { AuthReducer } from "./reducers/auth";
import { AuthContext } from "./context/auth";

const Loader = () => <div>loading...</div>;

export default function App() {
	// https://fakeapi.platzi.com/en/rest/auth-jwt
	const isAuthenticated = !!localStorage.getItem("sign-token");
	const initialState = {
		isAuthenticated,
		user: isAuthenticated ? JSON.parse(localStorage.getItem("sign-user")) : null,
		token: isAuthenticated ? JSON.parse(localStorage.getItem("sign-token")) : ""
	};

	const [authState, authDispatch] = useReducer(AuthReducer, initialState);
	return (
		<Suspense fallback={<Loader />}>
			<AuthContext.Provider value={{ authState, authDispatch }}>
				<Routes />
			</AuthContext.Provider>
		</Suspense>
	);
}
