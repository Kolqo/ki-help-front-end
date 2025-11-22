import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function putHistoryReprocess(historyId) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/histories/reprocess/${historyId}`,
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
			return putHistoryReprocess(historyId)
		} else {
			throw error
		}
	}
}
