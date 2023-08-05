export const useSerialize = () => {
	const encodeURIParameters = (parameters, prefix) => {
		let str = [];
		let p;
		for (p in parameters) {
			if (parameters.hasOwnProperty(p)) {
				const k = prefix ? prefix + "[" + p + "]" : p;
				const v = parameters[p];
				str.push(
					v !== null && typeof v === "object"
						? encodeURIParameters(v, k)
						: encodeURIComponent(k) + "=" + encodeURIComponent(v)
				);
			}
		}
		return str.join("&");
	};

	return {
		encodeURIParameters
	};
};
