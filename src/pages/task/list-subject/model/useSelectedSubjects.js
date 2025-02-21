import { useState, useEffect } from "react";
import getSubject from "../../../../entities/subject/api/getSubject.js";

export const useSelectedSubjects = (toggleId) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    getSubject(toggleId)
    .then((data) => {
      setSelectedSubjects(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, [toggleId]);

  return selectedSubjects;
};