import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postNotification(notification) {
  let data = new FormData();
  
  data.append('courseNumber', notification.courseNumber);
  data.append('message', notification.message);

  notification.files.forEach(file => {
    data.append('files', file);
  });

  let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/notifications/alarm`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: data,
	}

  try {
    await axios.request(config);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === "Термін дії JWT-токену сплив."
    ) {
      await autoAuth();
      return postNotification(notification)
    } else {
      throw error;
    }
  }
}