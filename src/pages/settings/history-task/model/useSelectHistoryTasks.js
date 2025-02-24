import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model/index.js"
import getBuyTask from "../../../../entities/task/api/getBuyTask.js";

const useSelectHistoryTasks = (telegramId) => {
  const [selectedHistoryTasks, setSelectedHistoryTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState()
  const {error, setError} = useErrorMessage()

  useEffect(() => {
    setIsLoading(true)
    getBuyTask(telegramId)
    .then((data) => {
      setSelectedHistoryTasks(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);
  return {error, errorMessage, isLoading, selectedHistoryTasks};
};

export default useSelectHistoryTasks;