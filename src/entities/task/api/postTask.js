import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTask(values, isAutoGeneration, selectedSettings) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/tasks/task`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      title: values[0],
      description: values[1],
      identifier: values[2],
      price: values[3],
      type: selectedSettings.type.name,
      developerTelegramId: selectedSettings.developer.telegramId,
      autoGenerate: isAutoGeneration,
      teacherId: selectedSettings.teacher.id,
      args: selectedSettings.arguments
    }
  };

  try {
    const response = await axios.request(config);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return postTask();
    }
    throw error;
  }
}