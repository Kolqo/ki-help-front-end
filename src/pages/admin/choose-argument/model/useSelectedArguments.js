import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"

import getArguments from "../../../../entities/checkbox-list/api/getArguments";

const useSelectedArguments = () => {
  const [selectedArguments, setSelectedArguments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTeacher = () => { 
    setIsLoading(true)
    getArguments()
    .then((data) => {
      setSelectedArguments(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  return {errorSelected: error, errorMessageSelected : errorMessage, isLoadingSelected: isLoading, selectedArguments, refetch: fetchTeacher};
};

export default useSelectedArguments;