import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTask(type, discountValue, availableValue, telegramId, taskId) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/discounts/discount`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      type: type,
      discountValue: discountValue,
      availableValue: availableValue,
      telegramId: telegramId,
      taskId: taskId,
    }
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return postTask();
    }
    throw error;
  }
}