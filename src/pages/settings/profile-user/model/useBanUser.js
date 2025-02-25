import { useState } from 'react';

import { useErrorMessage } from '../../../../shared/model';

import { patchBanUser } from '../../../../entities/user/api';

const useBanUser = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleBan = async (user) => {
    try {
      setIsLoading(true)
      console.log(user);
      await patchBanUser(user);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message)
      setError(true);
      setIsLoading(false)
    }
  };
  const errorBan = error;
  const errorMessageBan = errorMessage;
  const isLoadingBan = isLoading;
  return {
    errorBan ,
    errorMessageBan ,
    isLoadingBan ,
    handleBan,
  };
};

export default useBanUser;