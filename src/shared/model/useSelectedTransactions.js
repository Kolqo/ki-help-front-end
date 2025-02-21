import { useState, useEffect } from "react";
import getTransactions from "../../entities/transaction/api/getTransactions.js";

const useSelectedTransactions = (telegramId) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  useEffect(() => {
    getTransactions(telegramId)
    .then((data) => {
      setSelectedTransactions(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return selectedTransactions;
};

export default useSelectedTransactions