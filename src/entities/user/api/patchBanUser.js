import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchBanUser(user) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/users/toggle_ban_status?telegramId=${user.telegramId}&value=${!user.banned}`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchBanUser(user);
    } else {
      throw error;
    }
  }
}