import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import patchSubject from "../../../../entities/subject/api/patchSubject"

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

  const handlePatch = async (subject) => {
    try {
      setIsLoading(true)
      await patchSubject(subject, values[0]);
      setIsLoading(false)
      navigate(`/`)
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