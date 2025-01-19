const GetJWTToken = () => {
  const token = window.localStorage.getItem("jwt");

  if (!token) {
    console.log("Error: no token");
    return null;
  }
  return token;
};

export default GetJWTToken;
