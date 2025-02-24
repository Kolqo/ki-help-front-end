import { useState, useEffect } from "react";

import { useErrorMessage } from "./"

import getTransactions from "../../entities/transaction/api/getTransactions.js";

const useSelectedTransactions = (telegramId) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getTransactions(telegramId)
    .then((data) => {
      setSelectedTransactions(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);

  return {error, errorMessage, isLoading, selectedTransactions};
};

export default useSelectedTransactions