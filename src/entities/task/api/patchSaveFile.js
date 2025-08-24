import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchSaveFile(historyId, file) {
  let data = new FormData();

  data.append('id', historyId);
  data.append('file', file);
  console.log(historyId, file);
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/histories/developer/save_file`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: data
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
      return patchSaveFile(historyId, file);
    }
    throw error;
  }
}