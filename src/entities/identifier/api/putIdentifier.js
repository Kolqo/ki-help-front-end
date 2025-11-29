import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function putIdentifier(identifierId) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `api/v1/identifiers/identifier/${identifierId}`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
	}

	try {
		await axios.request(config)
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.error === 'Термін дії JWT-токену сплив.'
		) {
			await autoAuth()
			return putIdentifier(identifierId)
		} else {
			throw error
		}
	}
}
