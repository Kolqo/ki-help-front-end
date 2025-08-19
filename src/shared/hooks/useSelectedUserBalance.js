import { useState, useEffect } from "react";

import { useErrorMessage } from "./"

import getUserBalance from "../../entities/user/api/getUserBalance";

const useSelectedUserBalance = (telegramId) => {
  const [selectedUserBalance, setSelectedUserBalance] = useState();
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserBalance = () => {
    setIsLoading(true)
    getUserBalance(telegramId)
      .then((data) => {
        setSelectedUserBalance(data);
        setError(false)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(true)
        setErrorMessage(error.response.data.message)
        setIsLoading(false)
      });
  };

  useEffect(() => {
    fetchUserBalance();
  }, [telegramId]);

  return { data: selectedUserBalance, refetch: fetchUserBalance };
};

export default useSelectedUserBalance