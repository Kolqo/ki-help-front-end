import { useState, useEffect } from "react";

import { useErrorMessage } from '../../../../shared/hooks'
import getUser from "../../../../entities/user/api/getUser.js";

const useSelectedUser = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUser()
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

  return {error, errorMessage, isLoading, selectedUsers};
};

export default useSelectedUser