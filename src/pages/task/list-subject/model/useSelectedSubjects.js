import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"
import getSubject from "../../../../entities/subject/api/getSubject.js";

export const useSelectedSubjects = (toggleId) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getSubject(toggleId)
    .then((data) => {
      setSelectedSubjects(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, [toggleId]);

  return {error, errorMessage, isLoading, selectedSubjects};
};