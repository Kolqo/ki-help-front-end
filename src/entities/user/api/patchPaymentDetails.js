import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function patchPaymentDetails(
	walletId,
	paymentDetails,
	paymentDetailsType
) {
	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/wallets/payment_details`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			walletId: walletId,
			paymentDetails: paymentDetails,
			paymentDetailsType: paymentDetailsType,
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
			return patchPaymentDetails(walletId, paymentDetails, paymentDetailsType)
		} else {
			throw error
		}
	}
}
