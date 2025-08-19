import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postSubject(subjectData) {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/subjects/subject`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			name: subjectData.name,
			courseNumber:subjectData.courseNumber,
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
			return postSubject(subjectData)
		} else {
			throw error
		}
	}
}