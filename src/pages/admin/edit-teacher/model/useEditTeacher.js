import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import putTeacher from "../../../../entities/checkbox-list/api/putTeacher"

const useEditTeacher = (fields) => {
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

  const handlePut = async (teacher, subjectId) => {
    console.log(values[0], teacher.id);
    try {
      setIsLoading(true)
      await putTeacher(values[0], teacher.id);
      setIsLoading(false)
      navigate(`/list-task/${subjectId}/choose-teacher`)
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
    handlePut
  }
};

export default useEditTeacher;