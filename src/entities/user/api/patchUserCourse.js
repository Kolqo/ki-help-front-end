import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function patchUserCourse(courseNumber) {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `/api/v1/users/course_number`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
    data: {
      courseNumber: courseNumber
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return getSubject(courseNumber);
    } else {
      throw error;
    }
  }
}