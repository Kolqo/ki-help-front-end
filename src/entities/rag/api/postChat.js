import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function postChat(explanationSessionId, question) {
  console.log(
		'explanationSessionId:',
		explanationSessionId,
		'question:',
		question
	)
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/rag/chat`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			explanationSessionId: explanationSessionId,
			question: question,
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
			return postChat(explanationSessionId, question)
		} else {
			throw error
		}
	}
}
