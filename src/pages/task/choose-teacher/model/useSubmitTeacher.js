import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUserTeacher = () => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserTeacher = (objState, subjectID, getTeacher, filters, setFilters) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const teacher = getTeacher.find(creator => creator.id === Number(id));

    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    navigate(`/list-task/${subjectID}`);
  };

  return {
    handleSubmitUserTeacher,
    error,
  };
};

export default useSubmitUserTeacher;