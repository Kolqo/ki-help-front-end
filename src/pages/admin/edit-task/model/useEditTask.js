import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import patchTask from "../../../../entities/task/api/patchTask"

const useEditTask = (fields) => {
  const navigate = useNavigate()
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

  const handlePatch = async (subjectID, isVisible, selectedSettings) => {
    try {
      setIsLoading(true)
      await patchTask(values, isVisible, selectedSettings);
      setIsLoading(false)
      navigate(`/list-task/${subjectID}`)
    } catch (error) {
      console.log(error);
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
    handlePatch
  }
};

export default useEditTask;