import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchSubject(subject, newName) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/subjects/${subject.id}`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: newName,
      courseNumber: subject.courseNumber,
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
      return patchSubject(subject, newName)
    } else {
      throw error;
    }
  }
}