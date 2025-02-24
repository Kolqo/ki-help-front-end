import { useState } from 'react';
import inputTestFields from '../const/inputTestFields';

const useInputFields = (task) => {
  const [inputFields, setInputFields] = useState([{
    id: 1,
    label: `${task.arguments[0].name} №1`,
    placeholder: task.arguments[0].description,
  }]);

  const addNewField = () => {
    setInputFields(prevFields => [
      ...prevFields,
      {
        id: prevFields.length > 0 ? prevFields[prevFields.length - 1].id + 1 : 1,
        label: `${task.arguments[0].name} №${prevFields.length > 0 ? prevFields[prevFields.length - 1].id + 1 : 1}`,
        placeholder: task.arguments[0].description
      }
    ]);
  };

  return { inputFields, addNewField };
};

export default useInputFields;
