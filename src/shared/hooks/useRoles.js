import { jwtDecode } from 'jwt-decode'

const useRoles = () => {
	const getJwt = () => {
		const token = localStorage.getItem('jwt')
		if (token && token !== 'undefined') {
			try {
				return jwtDecode(token)
			} catch (e) {
				throw e
			}
		}
		return null
	}

	const isDeveloper = () => {
		return (
			getJwt() &&
			Array.isArray(getJwt().roles) &&
			getJwt().roles.includes('ROLE_DEVELOPER')
		)
	}

	const isAdmin = () => {
		return (
			getJwt() &&
			Array.isArray(getJwt().roles) &&
			getJwt().roles.includes('ROLE_ADMIN')
		)
	}

	return { getJwt, isDeveloper, isAdmin }
}

export default useRoles
