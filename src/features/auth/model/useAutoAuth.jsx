import { useState, useEffect } from "react";
import GetJWTToken from "../../../shared/api/getJWTToken";
import autoAuth from "../api/autoAuth";

const useAutoAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async () => {
    try {
      await autoAuth();
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Authentication failed:", e);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = GetJWTToken()
    if (!token) {
      authenticate();
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

export default useAutoAuth;
