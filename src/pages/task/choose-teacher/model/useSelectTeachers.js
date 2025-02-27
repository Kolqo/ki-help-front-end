import { useState, useEffect } from "react";

import { useErrorMessage } from "../../../../shared/model"
import getTeachers from "../../../../entities/checkbox-list/api/getTeachers";

const useSelectedSubjects = (subjectId) => {
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const {error, setError} = useErrorMessage()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTeacher = () => {
    setIsLoading(true)
    getTeachers(subjectId)
    .then((data) => {
      setSelectedTeachers(data);
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

  return {errorRender: error, errorMessage, isLoading, selectedTeachers, refetch: fetchTeacher};
};

export default useSelectedSubjects;