import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";

import postTeacher from "../../../../entities/checkbox-list/api/postTeacher"

const useAddTeacher = (fields) => {
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

  const handlePost = async (subjectId) => {
    let isError = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 50 || values[i].length < 1) {
        isError = true;
        break;
      }
    }
    
    if (isError) {
      setErrorMessage("Введіть коректну назву. Назва має бути довжиною від 1 до 50 символів")
      setError(true);
      return;
    } else {
      setError(false);
    }

    try {
      setIsLoading(true)
      await postTeacher(values[0], subjectId);
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
    handlePost
  }
};

export default useAddTeacher;