export const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			console.log(action);
			localStorage.setItem("sign-user", JSON.stringify(action.payload.user));
			localStorage.setItem("sign-token", JSON.stringify(action.payload.token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token
			};
		case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: ""
			};
		default:
			return state;
	}
};
