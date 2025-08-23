import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function deleteIdentifier(identifierId) {
	let config = {
		method: 'delete',
		maxBodyLength: Infinity,
		url: `/api/v1/identifiers/${identifierId}`,
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
			return deleteIdentifier(documentId)
		} else {
			throw error
		}
	}
}
