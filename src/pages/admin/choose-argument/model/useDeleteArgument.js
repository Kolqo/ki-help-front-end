import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

import deleteArgument from "../../../../entities/checkbox-list/api/deleteArgument"

const useDeleteArgument = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = async (argumentId) => {
    try {
      setIsLoading(true)
      await deleteArgument(argumentId);
      setIsLoading(false)
    } catch (error) {
      const message = error.response?.data?.message || error?.message || "Помилка при видаленні завдання";
      setErrorMessage(message)
      setError(true);
      setIsLoading(false)
    }
  }


  return {
    errorDelete: error,
    errorDeleteMessage: errorMessage,
    isLoadingMessage: isLoading,
    handleDelete,
  }
};

export default useDeleteArgument;