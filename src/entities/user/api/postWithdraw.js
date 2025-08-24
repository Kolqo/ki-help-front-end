import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postWithdraw(amount, encodedWalletId) {
  console.log(amount, encodedWalletId)
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/transactions/withdraw`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			amount: amount,
			encodedWalletId: encodedWalletId,
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
			return postWithdraw(amount, encodedWalletId)
		} else {
			throw error
		}
	}
}