import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postArgument(value) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/arguments/argument`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: value[0],
      description: value[1],
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
      return postArgument(value);
    } else {
      throw error;
    }
  }
}