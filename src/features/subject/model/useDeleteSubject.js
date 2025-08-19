import { useState }  from "react";

import { useErrorMessage } from '../../../shared/hooks'

import { deleteSubject } from '../../../entities/subject/api'

const useDeleteSubject = () => {
  const [ isError, setIsError ] = useErrorMessage();
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
      setIsError(true);
      setIsLoading(false)
    }
  }


  return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoadingMessage: isLoading,
		handleDelete,
	}
};

export default useDeleteSubject;