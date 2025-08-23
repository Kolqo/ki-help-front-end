import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function getUserByRole(roleName, currentPage = 0, limit = 10) {
  let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: `/api/v1/users?page=${currentPage}&limit=${limit}&role_name=${roleName}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
	}

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return getUserByRole(roleName);
    }
    throw error;
  }
}