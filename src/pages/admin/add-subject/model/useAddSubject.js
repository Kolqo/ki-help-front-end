import { useState }  from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from '../../../../shared/hooks'

import postSubject from "../../../../entities/subject/api/postSubject"


const useAddSubject = (fields) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useErrorMessage();
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

  const handlePost = async () => {
    let isError = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 50 || values[i].length < 1) {
        isError = true;
        break;
      }
    }
    
    if (isError) {
      setErrorMessage("Поля вводу не можуть бути пустими")
      setIsError(true)
      return;
    } else {
      setIsError(false)
    }

    try {
			setIsLoading(true)
			await postSubject(values[0], values[1])
			setIsLoading(false)
			navigate(`/`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додаванні предмета'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
  }


  return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handleFieldChange,
		handlePost,
	}
};

export default useAddSubject;