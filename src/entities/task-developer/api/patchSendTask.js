import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchSendTask(historyId, files) {
  let data = new FormData();
  console.log("files: ",files);
  if (files) {
    files.forEach(file => {
      data.append('file', file);
    });
  }

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/histories/history/${historyId}/developer/save-file`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: data
  };

  try {
    console.log("api:", files);
    await axios.request(config);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === "Термін дії JWT-токену сплив."
    ) {
      await autoAuth();
      return patchSendTask(historyId, files);
    }
    throw error;
  }
}