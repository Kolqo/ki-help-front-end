import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postSendSupportQuestion(message, files) {
  let data = new FormData();
  
  data.append('message', message);

  files.forEach(file => {
    data.append('files', file);
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/supports/sent`,
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
      return postSendSupportQuestion(message, files);
    } else {
      throw error;
    }
  }
}