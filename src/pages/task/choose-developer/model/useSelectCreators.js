import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"
import getCreators from "../../../../entities/checkbox-list/api/getCreators";

const useSelectedCreators = (subjectId) => {
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCreators(subjectId)
    .then((data) => {
      setSelectedCreators(data);
      setError(false)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(true)
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
    });
  }, []);
  const errorRender = error
  return {errorRender, errorMessage, isLoading, selectedCreators};
};

export default useSelectedCreators;