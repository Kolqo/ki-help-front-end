import { useState, useEffect } from "react";

import getTask from "../../../../entities/task/api/getTask.js";

const useSelectedTasks = () => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    getTask("XEWoS8aNIy")
    .then((data) => {
      setSelectedTasks(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);
  return selectedTasks;
};

export default useSelectedTasks;