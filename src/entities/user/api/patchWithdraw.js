import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchWithdraw(cardNumber, amount) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/wallets/withdraw`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      cardNumber: cardNumber,
      amount: amount,
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchWithdraw(cardNumber, amount);
    } else {
      throw error;
    }
  }
}