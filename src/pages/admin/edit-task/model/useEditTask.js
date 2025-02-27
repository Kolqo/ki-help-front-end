import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

const useEditTask = (fields) => {
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

  const handlePatch = async (teacherId) => {
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

    try {
      setIsLoading(true)
      // await postSubject(teacherId, values[0], values[1]);
      setIsLoading(false)
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

export default useEditTask;