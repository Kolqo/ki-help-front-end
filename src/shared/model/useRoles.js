import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useRoles = () => {
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setRoles(decoded);
    }
  }, []);

  const isDeveloper = () => {
    return roles && Array.isArray(roles.roles) && roles.roles.includes("ROLE_DEVELOPER");
  };

  const isAdmin = () => {
    return roles && Array.isArray(roles.roles) && roles.roles.includes("ROLE_ADMIN");
  };

  return { roles, isDeveloper, isAdmin };
};

export default useRoles;