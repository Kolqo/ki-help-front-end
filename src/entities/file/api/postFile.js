import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken.jsx'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function postFile(file) {
  let data = new FormData()
  data.append('multipartFile', file)

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/rag/upload_document`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: data
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
			return postFile(file)
		} else {
			throw error
		}
	}
}
