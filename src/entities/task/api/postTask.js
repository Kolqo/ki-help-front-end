import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTask(values) {
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
      type: "REGULAR",
      developerTelegramId: "string",
      autoGenerate: true,
      teacherId: "string",
      args: []
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