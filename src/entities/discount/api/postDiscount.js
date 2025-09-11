import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postDiscount(discount) {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/discounts/discount`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			value: discount.value,
			taskIds: discount.tasks.map(({ id }) => id),
			telegramIds: discount.users?.map(({ telegramId }) => telegramId),
			activationLimit: discount.activationLimits,
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
			return postDiscount(discount)
		} else {
			throw error
		}
	}
}