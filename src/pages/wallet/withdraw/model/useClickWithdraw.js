import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from '../../../../shared/hooks'

import { patchWithdraw } from "../../../../entities/user/api";

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

  const handleValidation = async () => {
    const firstValue = values[0].replace(/\s+/g, '');
    const secondValue = Number(values[1]);

    if (firstValue === "" || secondValue === 0) {
      setErrorMessage("Поля вводу не можуть бути пустими!")
      setError(true);
      return;
    }

    try {
      setIsLoading(true)
      await patchWithdraw(firstValue, secondValue);
      setIsLoading(false)
      navigate(`/wallet`)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setError(true);
      setIsLoading(false)
    }
  } 

  return {
    error,
    errorMessage,
    isLoading,
    handleFieldChange,
    handleValidation
  }
};

export default useEditSubject;