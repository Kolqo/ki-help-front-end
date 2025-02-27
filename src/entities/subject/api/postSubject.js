import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postSubject(name, courseNumber) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/api/v1/subjects/subject`,
    headers: {
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      name: name,
      courseNumber: Number(courseNumber),
    }
  };

  try {
    console.log("api:", name, courseNumber);
    await axios.request(config);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === "Термін дії JWT-токену сплив."
    ) {
      await autoAuth();
      return postSubject(name, courseNumber);
    } else {
      throw error;
    }
  }
}