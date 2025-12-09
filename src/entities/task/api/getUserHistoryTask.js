import axios from 'axios'

import GetJWTToken from '../../../shared/api/getJWTToken.jsx'

import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function getUserHistoryTask(telegramId, currentPage, isAutoGenerate) {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,

		url: `/api/v1/histories/user/${telegramId}?type=${isAutoGenerate}&page=${currentPage}&limit=5`,
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
			return getUserHistoryTask(telegramId, currentPage)
		}
		throw error
	}
}
