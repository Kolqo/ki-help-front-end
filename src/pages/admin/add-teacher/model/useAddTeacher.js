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

  const handleLengthValidation = () => {
    let isError = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 50 || values[i].length < 1) {
        isError = true;
        break;
      }
    }
    
    if (isError) {
      setError(true);
      return;
    } else {
      setError(false);
    }
  }


  return {
    error,
    handleFieldChange,
    handleLengthValidation
  }
};

export default useEditSubject;