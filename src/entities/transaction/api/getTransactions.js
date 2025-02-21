import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function getTransactions(telegramId) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/api/v1/transactions/history/user/${telegramId}?page=0&limit=5`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
        await autoAuth();
        return getTransactions(telegramId);
    }
    throw error;
  }
}