const GetJWTToken = () => {
  const token = window.localStorage.getItem("jwt");

  if (!token) {
    return null;
  }
  return token;
};

export default GetJWTToken;
