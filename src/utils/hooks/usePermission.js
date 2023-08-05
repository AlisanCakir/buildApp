export const usePermission = () => {
	const hasAccess = (groups, perms) => {
		if (!groups.length) {
			return false;
		}
		const intersection = (groups || []).map((group) => group.permissions.some((perm) => perms.includes(perm)));
		const has = !!intersection.length;

		return { intersection, has };
	};
	return { hasAccess };
};
