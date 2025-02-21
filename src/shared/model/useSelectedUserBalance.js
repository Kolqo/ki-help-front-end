import { useState, useEffect } from "react";
import getUserBalance from "../../entities/user/api/getUserBalance";

const useSelectedUserBalance = (telegramId) => {
  const [selectedUserBalance, setSelectedUserBalance] = useState();

  useEffect(() => {
    getUserBalance(telegramId)
    .then((data) => {
      setSelectedUserBalance(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return selectedUserBalance;
};

export default useSelectedUserBalance