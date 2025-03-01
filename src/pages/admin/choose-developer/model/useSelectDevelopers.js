import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"
import getUserByRole from "../../../../entities/user/api/getUserByRole"

const useSelectedDevelopers = (roleName) => {
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUserByRole(roleName)
    .then((data) => {
      setSelectedDevelopers(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);
  return {errorSelected: error, errorMessageSelected : errorMessage, isLoadingSelected: isLoading, selectedDevelopers};
};

export default useSelectedDevelopers;