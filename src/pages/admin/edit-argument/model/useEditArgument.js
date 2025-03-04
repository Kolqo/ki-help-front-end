import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import patchArgument from "../../../../entities/checkbox-list/api/patchArgument"

const useEditSubject = (fields) => {
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

  const handlePatch = async (argumentId, subjectId) => {
    try {
      setIsLoading(true)
      await patchArgument(argumentId, values);
      setIsLoading(false)
      navigate(`/list-task/add-task/${subjectId}/choose-argument`)
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
    handlePatch
  }
};

export default useEditSubject;