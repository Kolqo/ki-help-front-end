import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function putHistoryFile(file, historyId) {
	let data = new FormData()

	if (file.file) data.append('file', file.file)

	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/histories/history/update/${historyId}`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
			'Content-Type': 'multipart/form-data',
		},
		data: data,
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
			return putHistoryFile(file, historyId)
		} else {
			throw error
		}
	}
}
