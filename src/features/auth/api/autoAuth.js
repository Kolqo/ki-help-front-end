import axios from "axios";

export default async function autoAuth() {
  if (!window.Telegram || !window.Telegram.WebApp) {
    throw new Error("Telegram WebApp не доступний.");
  }
  
  const tg = window.Telegram.WebApp;

  tg.ready();

  if (!tg.initData) {
    throw new Error("tg.initData відсутній.");
  }

  let initData = tg.initData;
  
  let data = JSON.stringify(initData);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/v1/users/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    if (response && response.data && response.data.jwt) {
      const token = response.data.jwt;
      localStorage.setItem("jwt", token);
      console.log("JWT збережено:", token);
    } else {
      console.error("Відповідь не містить jwt", response);
      throw new Error("Відповідь не містить jwt");
    }
  } catch (error) {
    console.error("Помилка авторизації:", error);
    throw error;
  }
}