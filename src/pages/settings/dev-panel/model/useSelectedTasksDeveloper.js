import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model/index.js"
import getTaskDeveloper from "../../../../entities/task-developer/api/getTaskDeveloper.js";

const useSelectedTasksDeveloper = () => {
  const [selectedTasksDeveloper, setSelectedTasksDeveloper] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState()
  const {error, setError} = useErrorMessage()

  useEffect(() => {
    setIsLoading(true)
    getTaskDeveloper()
      .then((data) => {
        setSelectedTasksDeveloper(data);
        setError(false)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(true)
        setErrorMessage(error.response.data.message)
        setIsLoading(false)
      });
  }, []); 
  return {error, errorMessage, isLoading, selectedTasksDeveloper};
};

export default useSelectedTasksDeveloper;