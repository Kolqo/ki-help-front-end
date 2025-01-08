import axios from "axios";

export default async function autoAuth() {
  const tg = window.Telegram.WebApp;

  tg.ready();

  const tg_id = tg.initDataUnsafe.user.id;
  const username = tg.initDataUnsafe.user.username;
  const hash = tg.initDataUnsafe.hash

  let data = JSON.stringify({
    id: tg_id,
    username: username,
    hash: hash,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/v1/user/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const token = response.data.jwt;
    localStorage.setItem("jwt", token);
    console.log(localStorage.getItem("jwt"));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
