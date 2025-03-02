import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

import deleteTask from "../../../../entities/task/api/deleteTask.js"

const useDeleteTask = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      setIsLoading(true)
      await deleteTask(taskId);
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

export default useDeleteTask;