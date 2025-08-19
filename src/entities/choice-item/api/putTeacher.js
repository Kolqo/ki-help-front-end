import axios from 'axios'
import GetJWTToken from '../../../shared/api/getJWTToken'
import autoAuth from '../../../features/auth/api/autoAuth.js'

export default async function putTeacher(teacherData) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/teachers/teacher`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
      id: teacherData.id,
			name: teacherData.name,
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
			return putTeacher(teacherData)
		} else {
			throw error
		}
	}
}
