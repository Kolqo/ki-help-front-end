import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../../shared/model";
import postTaskProcess from "../../../../entities/task/api/postTaskProcess";

const useBuyingTask = (fields) => {
  const navigate = useNavigate();
  const { error, setError } = useErrorMessage();

  const [values, setValues] = useState(new Array(fields.length).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const handleFieldChange = (index, value) => {
    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value.target.value;
      return newValues;
    });
  };

  const handleValidation = async (subjectID, buying, task) => {
    let isError = false;

    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 50 || values[i].length < 1) {
        isError = true;
        break;
      }
    }

    if (isError) {
      setError(true);
      setErrorMessage("Введіть коректний аргумент. Аргумент не може бути пустим")
      return;
    } 

    if (window.Telegram.WebApp.initDataUnsafe.user.username == null) {
      setError(true);
      setErrorMessage("Поставте нікнейм перед покупкою завдання.")
      return;
    }

    setLoading(true);

    try {
      const processTask = await postTaskProcess(task.id, values);
      processTask.autoGenerate = task.autoGenerate

      navigate(`/list-task/${subjectID}/${buying}/buying-result`, {
        state: { processTask: processTask },
      });
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message)
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    errorMessage,
    loading,
    handleFieldChange,
    handleValidation,
  };
};

export default useBuyingTask;