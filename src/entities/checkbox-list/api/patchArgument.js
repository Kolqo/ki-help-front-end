import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchArgument(argumentId, values) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/arguments/${argumentId}`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: values[0],
      description: values[1],
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
      return patchArgument(argumentId, values)
    } else {
      throw error;
    }
  }
}