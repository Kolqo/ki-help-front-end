import { useState, useEffect } from "react";
import getSubject from "../../../../entities/subject/api/getSubject.js";

export const useSelectedSubjects = (toggleId) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const filteredSubjects = getSubject.filter((item) => item.courseNumber === toggleId);
    setSelectedSubjects(filteredSubjects);
  }, [toggleId]);

  return selectedSubjects;
};