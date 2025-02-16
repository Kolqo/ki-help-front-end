import { useState }  from "react";

import { useErrorMessage } from "../../../../shared/model";

const useEditTeacher = (fields) => {
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
    const length = values[0].length;
    
    if (length > 50 || length < 1) {
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

export default useEditTeacher;