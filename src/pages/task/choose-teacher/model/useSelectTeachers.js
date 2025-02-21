import { useState, useEffect } from "react";
import getTeachers from "../../../../entities/checkbox-list/api/getTeachers";

const useSelectedSubjects = (subjectId) => {
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    getTeachers(subjectId)
    .then((data) => {
      setSelectedTeachers(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return selectedTeachers;
};

export default useSelectedSubjects;