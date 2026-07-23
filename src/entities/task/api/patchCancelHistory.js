import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken.jsx'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function patchCancelHistory(id, reason) {
	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/histories/developer/cancel`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			id: id,
			reason: reason,
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
			return patchCancelHistory(id, reason)
		}
		throw error
	}
}
