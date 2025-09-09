import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchChangeBalance(walletId, amount) {

  let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `/api/v1/wallets/change_balance`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			walletId: walletId,
			amount: amount,
		},
	}

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return patchChangeBalance(walletId, amount)
    } else {
      throw error;
    }
  }
}