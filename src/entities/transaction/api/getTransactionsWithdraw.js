import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function getTransactionsWithdraw() {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: `/api/v1/transactions/withdraw/processing`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
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
			return getTransactionsWithdraw()
		}
		throw error
	}
}
