import { useState, useEffect } from "react";
import getCreators from "../../../../entities/checkbox-list/api/getCreators";

const useSelectedCreators = (subjectId) => {
  const [selectedCreators, setSelectedCreators] = useState([]);

  useEffect(() => {
    getCreators(subjectId)
    .then((data) => {
      setSelectedCreators(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);
  console.log("array:", selectedCreators)
  return selectedCreators;
};

export default useSelectedCreators;