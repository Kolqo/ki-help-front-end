import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../shared/hooks";

import { postTaskProcess } from "../../../entities/task/api";

const useAddTaskProcess = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async (subjectID, taskId, args) => {
    try {
      setIsLoading(true);
      const processTask = await postTaskProcess(taskId, args);
      localStorage.setItem("processTask", JSON.stringify(processTask));
      navigate(`/list-task/${subjectID}/buying/buying-result`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error?.message ||
        "Помилка при купівлі завдання";
      setErrorMessage(message);
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error: { isError: isError, errorMessage: errorMessage },
    isLoading,
    handlePost,
  };
};

export default useAddTaskProcess;
