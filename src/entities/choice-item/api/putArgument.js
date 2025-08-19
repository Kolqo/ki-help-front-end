import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function putArgument(argumentData) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/arguments/argument`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
      id: argumentData.id,
			name: argumentData.name,
			description: argumentData.description,
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
			return putArgument(argumentData)
		} else {
			throw error
		}
	}
}