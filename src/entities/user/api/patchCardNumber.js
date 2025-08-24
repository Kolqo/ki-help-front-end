import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function patchCardNumber(walletId, cardNumber) {
	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/wallets/card_number`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			walletId: walletId,
			cardNumber: cardNumber,
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
			return patchCardNumber(walletId, cardNumber)
		} else {
			throw error
		}
	}
}
