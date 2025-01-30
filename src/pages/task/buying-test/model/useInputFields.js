import { useState } from 'react';
import inputTestFields from '../const/inputTestFields';

const useInputFields = () => {
  const [inputFields, setInputFields] = useState(inputTestFields);

  const addNewField = () => {
    setInputFields(prevFields => [
      ...prevFields,
      {
        id: prevFields.length > 0 ? prevFields[prevFields.length - 1].id + 1 : 1,
        label: 'Новий тест',
        placeholder: 'Новий плейсхолдер'
      }
    ]);
  };

  return { inputFields, addNewField };
};

export default useInputFields;
