import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchTask(taskId, values, isVisible, selectedSettings) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/tasks/${taskId}`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      title: values[0],
      description: values[1],
      identifier: values[2],
      price: values[3],
      visible: isVisible,
      developerTelegramId: selectedSettings.developer.telegramId,
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === "Термін дії JWT-токену сплив."
    ) {
      await autoAuth();
      return patchTask(taskId, values, isVisible, selectedSettings)
    } else {
      throw error;
    }
  }
}