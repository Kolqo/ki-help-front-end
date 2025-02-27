import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function deleteSubject(subjectId) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `/api/v1/subjects/${subjectId}`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
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
      return deleteSubject(subjectId);
    } else {
      throw error;
    }
  }
}