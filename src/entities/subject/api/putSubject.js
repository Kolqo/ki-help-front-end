import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function putSubject(subjectData) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/subjects/subject`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
      id: subjectData.id,
			name: subjectData.name,
			courseNumber: subjectData.courseNumber,
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
			return putSubject(subjectData)
		} else {
			throw error
		}
	}
}