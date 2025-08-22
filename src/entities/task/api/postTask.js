import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken.jsx";

import autoAuth from "../../../features/auth/api/autoAuth.js";

export default async function postTask(task) {
  let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `/api/v1/tasks/task`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GetJWTToken()}`,
		},
		data: {
			title: task.title,
			description: task.description,
			price: Number(task.price),
			type: task.type,
			identifierId: task.identifier?.id,
			developerTelegramId: task.developer.telegramId,
			autoGenerate: task.autoGenerate,
			teacherId: task.teacher.id,
			documentId: task.document?.documentId,
			arguments: task.arguments.map(({ id }) => id),
		},
	}

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return postTask(task)
    }
    throw error;
  }
}