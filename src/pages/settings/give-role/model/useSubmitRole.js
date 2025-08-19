import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/hooks'

import { patchChangeRole } from '../../../../entities/user/api';

const useSubmitUserRole = (objState) => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  const handleSubmitUserRole = async (telegramId, getRoles) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const role = getRoles.find(role => role.id === Number(id));

    if (trueValues.length !== 1) {
      setErrorMessage("Виберіть лише одну роль, яку ви хочете змінити")
      setError(true);
      return;
    } else {
      setError(false);
    }

    try {
      setIsLoading(true)
      await patchChangeRole(telegramId, role.name);
      setIsLoading(false)
      navigate(`/settings/admin-panel/profile`);
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setError(true);
      setIsLoading(false)
    }
  };

  return {
    error,
    errorMessage,
    isLoading,
    handleSubmitUserRole,
  };
};

export default useSubmitUserRole;