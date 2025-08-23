import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchChangeRole(telegramId, role) {
  console.log(telegramId, role.type);
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/users/toggle_role`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      telegramId: telegramId,
      roleName: role.type,
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchChangeRole(telegramId, role);
    } else {
      throw error;
    }
  }
}