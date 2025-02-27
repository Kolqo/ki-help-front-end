import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

import deleteSubject from "../../../../entities/subject/api/deleteSubject"

const useDeleteSubject = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = async (subjectId) => {
    try {
      setIsLoading(true)
      await deleteSubject(subjectId);
      setIsLoading(false)
    } catch (error) {
      const message = error.response?.data?.message || error?.message || "Помилка при додаванні предмета";
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

export default useDeleteSubject;