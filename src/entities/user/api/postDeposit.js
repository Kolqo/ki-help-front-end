import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postDeposit(amount, provider) {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/transactions/request/deposit`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			amount: amount,
			provider: provider,
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
			return postDeposit(amount, provider)
		} else {
			throw error
		}
	}
}