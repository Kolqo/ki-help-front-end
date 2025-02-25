import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchChangeRole(telegramId, roleName) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/users/${telegramId}/roles`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      roleName: roleName
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchChangeRole(telegramId, roleName);
    } else {
      throw error;
    }
  }
}