import { useState } from 'react';
import { useErrorMessage } from '../../../../shared/model';

import { useNavigate } from "react-router-dom";

import getBankJar from "../../../../entities/user/api/getBankJar.js";

export const useBankJar = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();
  const handleChooseJar = async () => {
    try {
      navigate(`/loading`)
      await getBankJar()
      setError(false)
      navigate(`/wallet`)
    } catch (error) {
      setError(true)
      setErrorMessage(error.response.data.message)
    } 
  };
  return {error, errorMessage, handleChooseJar};
};
