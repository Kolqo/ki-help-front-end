import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function putTeacher(newName, teacherId) {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `/api/v1/teachers/${teacherId}`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: newName,
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
      return putTeacher(newName, teacherId)
    } else {
      throw error;
    }
  }
}