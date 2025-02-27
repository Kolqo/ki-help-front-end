import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTeacher(name, subjectId) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/teachers/teacher`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: name,
      subjectId: subjectId,
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
      return postTeacher(name, subjectId);
    } else {
      throw error;
    }
  }
}