import { useState } from 'react';
import { useErrorMessage } from '../../../../shared/model';

import getIsAvailableBonusClaim from "../../../../entities/invited-user/api/putDepositAmount.js";

export const useDepositAmount = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")

  const handleBonusClaim = async () => {
    try {
      await getIsAvailableBonusClaim();
      setError(false)
    } catch (error) {
      setError(true)
      setErrorMessage(error.response.data.message)
    } 
  };
  return {error, errorMessage,handleBonusClaim};
};