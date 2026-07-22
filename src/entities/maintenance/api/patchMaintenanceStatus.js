import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function patchMaintenanceStatus(enabled, message) {
	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/maintenance/status`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			enabled: enabled,
			message: message,
		},
	}

	try {
		const response = await axios.request(config)
		return response.data
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.error === 'Термін дії JWT-токену сплив.'
		) {
			await autoAuth()
			return patchMaintenanceStatus(enabled, message)
		}
		throw error
	}
}
