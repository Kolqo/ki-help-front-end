import axios from "axios";
import GetJWTToken from "../../../shared/api/getJWTToken.jsx";
import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function putTask(task) {
  let config = {
		method: 'put',
		maxBodyLength: Infinity,
		url: `/api/v1/tasks/task`,
		headers: {
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
      id: task.id,
			title: task.title,
			description: task.description,
			identifier: task.identifier,
			price: Number(task.price),
			type: task.type,
			developerTelegramId: task.developer.telegramId,
			autoGenerate: task.autoGenerate,
      visible: true,
			teacherId: task.teacher.id,
			documentId: task.document?.documentId,
			arguments: task.arguments.map(({ id }) => id),
		},
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
      return putTask(task)
    } else {
      throw error;
    }
  }
}