import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import postTask from "../../../../entities/task/api/postTask";

const useEditTask = (fields) => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const [values, setValues] = useState(
    new Array(fields.length).fill("")
  );

  const handleFieldChange = (index, value) => {
    setValues(prev => {
      const newValues = [...prev];
      newValues[index] = value.target.value;
      return newValues;
    });
  };

  const handlePost = async (isAutoGeneration, selectedSettings, subjectID) => {
    let isError = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 50 || values[i].length < 1) {
        isError = true;
        break;
      }
    }
  
    
    if (isError) {
      setErrorMessage("Поля вводу не можуть бути пустими")
      setError(true);
      return;
    } else {
      setError(false);
    }
    console.log("useAdd: ", subjectID);
    try {
      setIsLoading(true)
      await postTask(values, isAutoGeneration, selectedSettings);
      setIsLoading(false)
      navigate(`/list-task/${subjectID}`)
    } catch (error) {
      const message = error.response?.data?.message || error?.message || "Помилка при додаванні предмета";
      setErrorMessage(message)
      setError(true);
      setIsLoading(false)
    }
  }

  return {
    error,
    errorMessage,
    isLoading,
    handleFieldChange,
    handlePost
  }
};

export default useEditTask;