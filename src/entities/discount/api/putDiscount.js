import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function putDiscount(discount) {
	let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/discounts/discount`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			discountId: discount.discountId,
			value: discount.value,
			telegramId: discount.users[0]?.telegramId,
			activationLimit: discount.activationLimit,
			from: discount.validFrom,
			to: discount.validTo,
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
			return putDiscount(discount)
		} else {
			throw error
		}
	}
}