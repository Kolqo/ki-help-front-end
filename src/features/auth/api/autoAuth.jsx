import axios from "axios";

export default async function autoAuth() {
  const tg = window.Telegram.WebApp;

  tg.ready();

  let data = JSON.stringify(tg.initData);

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
