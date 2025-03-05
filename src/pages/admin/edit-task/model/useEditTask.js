import { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import patchTask from "../../../../entities/task/api/patchTask"

const useEditTask = (fields, storageValues) => {
  const navigate = useNavigate()
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const [values, setValues] = useState(() => {
    const savedValues = sessionStorage.getItem("formValues");
    if (savedValues) {
      return JSON.parse(savedValues);
    }
    return new Array(fields.length).fill("");
  });

  useEffect(() => {
    if (storageValues) {
      setValues(storageValues);
    }
  }, [storageValues]);

  useEffect(() => {
    sessionStorage.setItem("formValues", JSON.stringify(values));
  }, [values]);

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
      sessionStorage.removeItem("formValues");
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
    values,
    handleFieldChange,
    handlePatch
  }
};

export default useEditTask;