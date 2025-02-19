import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

const useEditSubject = (fields) => {
  const { error, setError } = useErrorMessage();

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

  const handleValidation = () => {
    const firstValue = values[0].replace(/\s+/g, '');;
    const isEnoughLength = firstValue.length < 16 || firstValue.length > 16

    const secondValue = Number(values[1]);
    const isLess = !values[1] || isNaN(secondValue) || secondValue < 100
    
    if (isEnoughLength || isLess) {
      setError(true);
      return;
    } else {
      setError(false);
    }
  }


  return {
    error,
    handleFieldChange,
    handleValidation
  }
};

export default useEditSubject;