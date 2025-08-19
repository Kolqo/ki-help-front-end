import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTaskProcess(taskId, args) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/tasks/process`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      taskId: taskId,
      arguments: args,
    }
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return postTaskProcess(taskId, args);
    }
    throw error;
  }
}