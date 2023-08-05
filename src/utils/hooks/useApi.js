import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth";

export const useAPI = () => {
	const { authState } = useContext(AuthContext);

	const defaultHeader = {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${authState?.token}`
	};

	const hostname = "api.escuelajs.co/api/v1/";

	const baseUrl = "https://" + hostname;

	const customFetch = ({ endpoint, method = "GET", body = {}, headers = defaultHeader, isBinary, isFormData }) => {
		const url = `${baseUrl}${endpoint}`;
		const options = {
			method,
			headers
		};

		if (Object.keys(body).length) options.data = JSON.stringify(body);
		if (isBinary) options.responseType = "arraybuffer";
		if (isFormData) {
			options.headers["Content-Type"] = "multipart/form-data";
			options.data = body;
		}
		return axios(url, options)
			.then((response) => response.data)
			.catch((error) => {
				console.log(error, url, "api error");
			});
	};

	const get = (endpoint, id, query, token) => {
		const url = `${endpoint}${id ? `/${id}${query ? `?${query}` : ""}` : `${query ? `?${query}` : ""}`}`;

		if (token) {
			defaultHeader.Authorization = `Bearer ${token}`;
		}
		return customFetch({ endpoint: url });
	};

	const post = (endpoint, body = {}, isFormData) => {
		if (!Object.keys(body).length && !isFormData) throw new Error("to make a post you must provide a  body");

		return customFetch({ endpoint, method: "POST", body, isFormData });
	};

	const getBinaryData = (endpoint, id, query, token) => {
		const url = `${endpoint}${id ? `/${id}${query ? `?${query}` : ""}` : `${query ? `?${query}` : ""}`}`;

		if (token) {
			defaultHeader.Authorization = `Bearer ${token}`;
		}
		return customFetch({ endpoint: url, isBinary: true });
	};

	const put = (endpoint, id, body = {}, token) => {
		if (!id && !body) throw new Error("to make a put you must provide the id and the   body");
		if (token) {
			defaultHeader.Authorization = `Bearer ${token}`;
		}
		const url = `${endpoint}${id ? `/${id}` : ""}`;
		return customFetch({
			endpoint: url,
			method: "PUT",
			body,
			headers: defaultHeader
		});
	};

	const del = (endpoint, id) => {
		if (!id) throw new Error("to make a delete you must provide the id and the body");
		const url = `${endpoint}/${id}`;

		return customFetch({ endpoint: url, method: "DELETE" });
	};
	return {
		get,
		post,
		put,
		del,
		getBinaryData
	};
};
