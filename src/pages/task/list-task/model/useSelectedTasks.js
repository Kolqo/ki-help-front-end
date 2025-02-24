import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model/index.js"
import getTask from "../../../../entities/task/api/getTask.js";

const useSelectedTasks = (selectedFilters) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState()
  const {error, setError} = useErrorMessage()

  useEffect(() => {
    if (selectedFilters.teacher?.id) {
      setIsLoading(true)
      getTask(selectedFilters.teacher.id)
        .then((data) => {
          setSelectedTasks(data);
          setError(false)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(true)
          setErrorMessage(error.response.data.message)
          setIsLoading(false)
        });
    }
  }, [selectedFilters.teacher]); 
  return {error, errorMessage, isLoading, selectedTasks};
};

export default useSelectedTasks;