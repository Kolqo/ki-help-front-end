import { useState } from "react";

import { useErrorMessage } from '../../../../shared/hooks'
import { patchAdminDeposit } from "../../../../entities/user/api";

const useEditSubject = () => {
  const {error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async (amount, telegramId) => {
    try {
      setIsLoading(true);
      await patchAdminDeposit(amount, telegramId);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data);
      setError(true);
      setIsLoading(false);
    }
  };

  return {
    error,
    errorMessage,
    isLoading,
    handleDeposit,
  };
};

export default useEditSubject;