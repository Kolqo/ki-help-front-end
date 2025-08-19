import axios from "axios";

import GetJWTToken from "../../../shared/api/getJWTToken";

import autoAuth from "../../../features/auth/api/autoAuth.js";

function isIOS(){
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export default async function getBankJar() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/api/v1/wallets/jar`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${GetJWTToken()}`
    },
  };

  try {
    const response = await axios.request(config);
    if (isIOS()) {
      window.location.href = response.data.link;
    } else {
      window.open(response.data.link, '_blank');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === "Термін дії JWT-токену сплив.") {
      await autoAuth();
      return getBankJar();
    }
    throw error;
  }
}