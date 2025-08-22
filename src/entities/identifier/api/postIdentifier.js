import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function postIdentifier(identifier) {
	let data = new FormData()

	data.append('name', identifier.name)
	data.append('description', identifier.description)
  if (identifier.file) data.append('file', identifier.file)

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/identifier/identifier`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
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
			return postIdentifier(identifier)
		} else {
			throw error
		}
	}
}
