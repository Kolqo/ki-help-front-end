import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUserCourse = () => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserCourse = (objState, subjectID, getTypes) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const type = getTypes.find(type => type.id === Number(id));

    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    sessionStorage.setItem("selectedType", JSON.stringify(type));
    navigate(`/list-task/add-task/${subjectID}`);
  };

  return {
    handleSubmitUserCourse,
    error,
  };
};

export default useSubmitUserCourse;