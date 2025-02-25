import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useRoles = () => {
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setJwt(decoded);
    }
  }, []);

  const isDeveloper = () => {
    return jwt && Array.isArray(jwt.roles) && jwt.roles.includes("ROLE_DEVELOPER");
  };

  const isAdmin = () => {
    return jwt && Array.isArray(jwt.roles) && jwt.roles.includes("ROLE_ADMIN");
  };

  return { jwt, isDeveloper, isAdmin };
};

export default useRoles;