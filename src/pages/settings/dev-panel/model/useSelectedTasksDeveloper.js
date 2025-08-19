import { useState, useEffect } from "react";

import { useErrorMessage } from '../../../../shared/hooks'
import getTaskDeveloper from "../../../../entities/task-developer/api/getTaskDeveloper.js";

const useSelectedTasksDeveloper = () => {
  const [selectedTasksDeveloper, setSelectedTasksDeveloper] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState()
  const {error, setError} = useErrorMessage()

  const fetchTasksDeveloper = () => {
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
  }

  useEffect(() => {
    fetchTasksDeveloper();
  }, []); 



  return {error, errorMessage, isLoading, selectedTasksDeveloper, refetch: fetchTasksDeveloper};
};

export default useSelectedTasksDeveloper;