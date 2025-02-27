import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

import deleteTeacher from "../../../../entities/checkbox-list/api/deleteTeacher"

const useDeleteTeacher = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = async (teacherId) => {
    try {
      setIsLoading(true)
      await deleteTeacher(teacherId);
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
    errorMessageDelete: errorMessage,
    isLoadingDelete: isLoading,
    handleDelete,
  }
};

export default useDeleteTeacher;