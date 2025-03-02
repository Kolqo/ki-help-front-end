import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"
import getUserByRole from "../../../../entities/user/api/getUserByRole"

const useSelectedUsers = (roleName) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUserByRole(roleName)
    .then((data) => {
      setSelectedUsers(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);
  return {errorSelected: error, errorMessageSelected : errorMessage, isLoadingSelected: isLoading, selectedUsers};
};

export default useSelectedUsers;