import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import postTask from "../../../../entities/task/api/postTask";

const useEditTask = (fields, storageValues) => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value.target.value;
      return newValues;
    });
  };

  const handlePost = async (isAutoGeneration, selectedSettings, subjectID) => {
    try {
      setIsLoading(true);
      await postTask(values, isAutoGeneration, selectedSettings);
      sessionStorage.removeItem("formValues");
      setIsLoading(false);
      navigate(`/list-task/${subjectID}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error?.message ||
        "Помилка при додаванні предмета";
      setErrorMessage(message);
      setError(true);
      setIsLoading(false);
    }
  };

  return {
    error,
    errorMessage,
    isLoading,
    values,
    handleFieldChange,
    handlePost,
  };
};

export default useEditTask;