import { useState, useEffect } from "react";
import { useErrorMessage } from "../../../../shared/model"

import getInvitedUser from "../../../../entities/invited-user/api/getInvitedUser.js";

export const useSelectedInvitedUsers = () => {
  const [selectedInvitedUsers, setSelectedInvitedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getInvitedUser()
    .then((data) => {
      setSelectedInvitedUsers(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);

  return {error, errorMessage, isLoading, selectedInvitedUsers};
};