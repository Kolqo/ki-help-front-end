import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchAdminDeposit(amount, telegramId) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/wallets/deposit`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      userTelegramId: telegramId,
      amount: amount
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchAdminDeposit(amount, telegramId);
    } else {
      throw error;
    }
  }
}