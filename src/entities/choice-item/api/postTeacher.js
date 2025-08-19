import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTeacher(teacherData) {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/teachers/teacher`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			name: teacherData.name,
			subjectId: teacherData.subjectId,
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
			return postTeacher(teacherData)
		} else {
			throw error
		}
	}
}