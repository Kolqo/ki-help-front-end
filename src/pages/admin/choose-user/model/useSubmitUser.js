import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUser = () => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmitUser = (user, amount, subjectId) => {
    if (amount.length < 0) {
      setErrorMessage("Кількість знижок має бути більше 1")
      setError(true);
      return;
    } else {
      setError(false);
    }
    
    sessionStorage.setItem("selectedUser", JSON.stringify(user));
    sessionStorage.setItem("selectedAmount", JSON.stringify(amount));
    navigate(`/list-task/edit-task/${subjectId}/give-discount`)
  };

  return {
    error,
    errorMessage,
    handleSubmitUser,
  };
};

export default useSubmitUser;