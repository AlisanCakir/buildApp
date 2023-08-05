import React, { useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth";
import {
	DashboardScreen,
	LoginScreen
} from "./screens";

const PrivateRoute = ({ component, ...options }) => {
	const {
		authState: { isAuthenticated }
	} = useContext(AuthContext);

	if (isAuthenticated) {
		return (
			<Route {...options} component={component} />
		);
	} else {
		return <Redirect to="/login" />;
	}
};

const PublicRoute = ({ component, path, ...options }) => {
	const {
		authState: { isAuthenticated }
	} = useContext(AuthContext);
	if (isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<div>
				<Route {...options} component={component} />
			</div>
		);
	}
};
const Routes = () => (
	<Router>
		<Switch>
			<PrivateRoute path="/" exact={true} component={DashboardScreen} />

			<PublicRoute path="/login" component={LoginScreen} />
		</Switch>
	</Router>
);

export default Routes;
