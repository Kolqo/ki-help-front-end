import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function getTransactions(walletId, currentPage) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/api/v1/transactions/transaction/${walletId}?page=${currentPage}&limit=5`,
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
        return getTransactions(walletId, currentPage);
    }
    throw error;
  }
}