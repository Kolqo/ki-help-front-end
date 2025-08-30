import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function patchConfirmWithdraw(payment) {
	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/transactions/confirm-withdraw`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			transactionId: payment.id,
			errorMessage: payment.errorMessage,
			status: payment.status,
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
			return patchConfirmWithdraw(payment)
		}
		throw error
	}
}
