import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

import postDiscount from "../../../../entities/task/api/postDiscount"

const useSubmitUserTeacher = () => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handlePost = async (state, discountValue, availableValue, telegramId, taskId) => {
    const type = state ? "GLOBAL" : "LOCAL"
    try {
      setIsLoading(true)
      console.log(type, discountValue, availableValue, telegramId, taskId);
      await postDiscount(type, discountValue, availableValue, telegramId, taskId);
      setIsLoading(false)
    } catch (error) {
      const message = error.response?.data?.message || error?.message || "Помилка при видаленні завдання";
      setErrorMessage(message)
      setError(true);
      setIsLoading(false)
    }
  };

  return {
    error,
    errorMessage,
    isLoading,
    handlePost
  };
};

export default useSubmitUserTeacher;