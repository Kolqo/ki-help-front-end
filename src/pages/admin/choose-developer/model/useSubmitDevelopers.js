import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitDevelopers = () => {
  const {error, setError} = useErrorMessage()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleSubmitDevelopers = (objState, subjectID, getCreators, isEdit) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const creator = getCreators.find(creator => creator.telegramId === id);

    if (trueValues.length > 1) {
      setErrorMessage("Розробник повинен бути лише один")
      setError(true);
      return;
    } else {
      setError(false);
    }
    
    sessionStorage.setItem("selectedCreator", JSON.stringify(creator));
    if (isEdit) {
      navigate(`/list-task/edit-task/${subjectID}`)
    } else {
      navigate(`/list-task/add-task/${subjectID}`)
    }
  
  };

  return {
    error,
    errorMessage,
    handleSubmitDevelopers,
  };
};

export default useSubmitDevelopers;