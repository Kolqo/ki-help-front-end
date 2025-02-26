import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

import patchSendTask from "../../../../entities/task-developer/api/patchSendTask.js";

const useSendTask = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSendTask = async (historyId, files) => {
    try {
      setIsLoading(true)
      await patchSendTask(historyId, files);
      setIsLoading(false)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setError(true);
      setIsLoading(false)
    }
  } 

  return {
    error,
    errorMessage,
    isLoading,
    handleSendTask
  }
};

export default useSendTask;